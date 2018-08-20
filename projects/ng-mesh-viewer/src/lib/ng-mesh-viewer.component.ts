import { Component, OnChanges, AfterViewInit, SimpleChanges, Input, ViewChild, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';
import * as THREE from 'three';
import OBJLoader from 'three-obj-loader';
OBJLoader(THREE);
import { OrbitControls } from '@avatsaev/three-orbitcontrols-ts';
import * as d3 from 'd3-scale-chromatic';

import { NgMeshViewerService } from './ng-mesh-viewer.service';

import { OBJGeometry } from './ng-mesh-viewer.service';

@Component({
  selector: 'ng-mesh-viewer',
  templateUrl: 'ng-mesh-viewer.component.html',
  styleUrls: ['ng-mesh-viewer.component.css'],
  providers: [ NgMeshViewerService ]
})

export class NgMeshViewerComponent implements OnChanges, AfterViewInit {

  @Output() clickedRoom = new EventEmitter();             // Clicked room
  @Output() clickedCanvas = new EventEmitter();

  public spaces;
  @Input() public data;           //JSON + obj
  @Input() public showCentroids: boolean = true;
  @Input() public showBoundingBox: boolean = true;

  // THREE JS
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;
  public controls;

  // GEOMETRY
  public boundingBox: THREE.Box3; // Vounding box of full geometry
  public centroid: THREE.Vector3 = new THREE.Vector3(0.5,0.5,0.5);; // Centroid of full geometry
  public size: THREE.Vector3;     // Size of full geometry

  public highlightMaterial = new THREE.MeshBasicMaterial( { color: 0x7c0a02, opacity: 1 } );
  public hoverMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, opacity: 0.2 } );

  // SELECTION
  public selected;                // Stores the selected object
  public previousMaterial;        // Stores the color of the object which was previously selected/hovered
  public previousHovered;         // Stores the object which was previously hovered
  
  public canvasClass: string = 'default';

  @ViewChild('canvas')
  private canvasRef: ElementRef;

  constructor( private _s: NgMeshViewerService ) {
    this.render = this.render.bind(this);
  }

  ngOnChanges(changes: SimpleChanges) {

    if(Array.isArray(changes.data.currentValue)){

      this.createScene();

      // Perform geometry preprocessing
      // Scales and offsets geometry to fit ([0,0,0], [1,1,1]) scene
      var processed = this._s.processOBJ(this.data).then(res => {
        this.spaces = res.zones;
        console.log(this.spaces);
        this.appendMeshes(this.spaces);
      });
      
      this.createRenderer();
      this.createCamera();
      this.createControls();
      this.render();
    }

  }

  ngAfterViewInit() {
    
  }

  public render() {
    this.renderer.render(this.scene, this.camera);
  }

  private createScene(): THREE.Scene {
      this.scene = new THREE.Scene();

      var ambient = new THREE.AmbientLight( 0x101030 );
      this.scene.add( ambient );

      var light = new THREE.PointLight(0xffffff, 1, 1000);
      light.position.set(0, 0, 1);
      this.scene.add(light);

      var light = new THREE.PointLight(0xffffff, 1, 1000);
      light.position.set(0, 1, 1);
      this.scene.add(light);

      return this.scene;
  }

  private createRenderer(): THREE.WebGLRenderer {
    var canvas = this.canvasRef.nativeElement;
    this.renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true, alpha: true } );
    this.renderer.setClearColor( 0xffffff, 0);
    this.renderer.setSize( window.innerWidth, window.innerHeight );

    return this.renderer;
  }

  private appendMeshes(spaces): void {

    // Add OBJ graphics
    var objLoader = new THREE.OBJLoader();
    var colorScheme = d3.schemeCategory10;

    // Convert to array if only single space received
    if(!Array.isArray(spaces)) spaces = [spaces];

    for(var space of spaces){

      var myObj = objLoader.parse(space.geometry);
      var randInt = Math.floor(Math.random() * 10);
      var color = new THREE.Color(colorScheme[randInt]);

      // Define material
      var material = new THREE.MeshBasicMaterial( { color: color, side: THREE.DoubleSide, opacity: 0.5, transparent: true, depthWrite: false } );

      myObj.name = space.uri;

      var invalidPos;
      myObj.traverse(child => {
        if ( child instanceof THREE.Mesh ) {
          child.name = space.uri;
          child.material = material;

          // Get position attribute
          var x: any = child.geometry.clone();
          invalidPos = x.attributes.position.array.includes(NaN);
        }
      });

      // Add if not position includes NaN value(s)
      if(!invalidPos){
        this.scene.add(myObj);
      
        if(this.showCentroids){
          // Get centroid of space
          var bbox = new THREE.Box3().setFromObject(myObj)

          var ct = new THREE.Vector3();
          bbox.getCenter(ct);

          // Add centroid
          var geo = new THREE.Geometry();
          geo.vertices.push(ct);
          var color = new THREE.Color( "#000000" );
          var mat = new THREE.PointsMaterial( { size: 2, sizeAttenuation: false, color: color } );
          var centroid = new THREE.Points( geo, mat );
          this.scene.add(centroid);
        }
      }else{
        console.log("Space " + space.uri + " has invalid position attributes.")
      }
    }

    return;
    
  }

  private createCamera(): THREE.Camera {
    let aspectRatio = this.getAspectRatio();
    var fov = 75;   // vertical field of view
    var near = 0.1; // near plane
    var far = 1000;  // far plane

    this.camera = new THREE.PerspectiveCamera( fov, aspectRatio, near, far );
    this.camera.up.set(0,0,1);    // z-axis up
    this.camera.lookAt( this.centroid );
    this.camera.position.set(1.1, 0.5, 1.1);

    // fov = 2 * Math.atan( height / ( 2 * dist ) ) * ( 180 / Math.PI );
    this.camera.fov = 2 * Math.atan( 1 / ( 2 * 0.25 ) ) * ( 180 / Math.PI );

    return this.camera;
  }

  private createControls(): THREE.OrbitControls {
    this.controls = new OrbitControls( this.camera, this.renderer.domElement );
    this.controls.minPolarAngle = 0;
    this.controls.maxPolarAngle = Math.PI;
    this.controls.minDistance = 0;
    this.controls.maxDistance = 10;

    // set camera to rotate around center of loaded object
    this.controls.target = this.centroid;

    this.controls.addEventListener('change', this.render);

    return this.controls;
  }

  private getAspectRatio(): number {
      var canvas = this.canvasRef.nativeElement;
      let height = canvas.clientHeight;
      if (height === 0) {
          return 0;
      }
      return canvas.clientWidth / canvas.clientHeight;
  }

  /* EVENTS */
  public onMouseDown(event: MouseEvent): void {
    event.preventDefault();

    // Unselect previously selected object
    if(this.selected){
      this.selected.material = this.previousMaterial;
      this.selected = null;
    }

    // Define mouse click as (x,y) vector
    var mouse = new THREE.Vector2();
    mouse.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = - (event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;

    var obj: any = this.intersectingMesh(mouse);
    
    // Change color
    if(obj){
      // Store
      this.selected = obj;
      this.previousMaterial = obj.material;

      // Set new material
      obj.material = this.highlightMaterial;

      // Emit output
      this.clickedRoom.emit({uri: obj.name});
    }
    this.render();
    return;

  }

  public onMouseMove(event: MouseEvent): void{
    event.preventDefault();

    if(!this.renderer) return;

    // Define mouse click as (x,y) vector
    var mouse = new THREE.Vector2();
    mouse.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = - (event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;

    var obj: any = this.intersectingMesh(mouse);

    if(obj) {

      // Save material for later if hover just initiated
      if(obj != this.previousHovered){
        this.canvasClass = "clickable"

        // // Restore material for previously hovered
        // if(this.previousHovered){
        //   this.previousHovered.material = this.previousMaterial;
        // }

        // Set current object to previously hovered
        this.previousHovered = obj;
        // this.previousMaterial = obj.material;

        // // Set hover material on object (if not selected)
        // if(obj != this.selected){
        //   obj.material = this.hoverMaterial;
        // }
        
      }
    }else{
      if(this.previousHovered){
        this.canvasClass = "default"
        // if(this.previousHovered != this.selected){
        //   // Restore material for previously hovered and set previously hovered to null
        //   this.previousHovered.material = this.previousMaterial;
        // }
        this.previousHovered = null;
      }
    }
    this.render();

    return;
  }

  private findAllObjects(pred: THREE.Object3D[], parent: THREE.Object3D): void {
      // NOTE: Better to keep separate array of selected objects
      if (parent.children.length > 0) {
          parent.children.forEach((i) => {
              pred.push(i);
              this.findAllObjects(pred, i);              
          });
      }
      return;
  }

  private intersectingMesh(mouse): THREE.Object3D {

    // Get all objects in scene
    var obj: THREE.Object3D[] = [];
    this.findAllObjects(obj, this.scene);

    // Create raycaster from camera towards mouse position
    var raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, this.camera);

    // Find intersecting objects
    var intersects = raycaster.intersectObjects(obj);

    if(intersects){
      // Only interested in meshes
      var a = intersects.filter(x => x.object.type == "Mesh")[0];
      if(a) return a.object;
    }
    
    return null;

  }

  public onMouseUp(event: MouseEvent): void {
      // console.log("onMouseUp");
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: Event): void {
      this.canvasRef.nativeElement.style.width = "100%";
      this.canvasRef.nativeElement.style.height = "100%";
      console.log("onResize: " + this.canvasRef.nativeElement.clientWidth + ", " + this.canvasRef.nativeElement.clientHeight);

      this.camera.aspect = this.getAspectRatio();
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.canvasRef.nativeElement.clientWidth, this.canvasRef.nativeElement.clientHeight);
      this.render();
      return;
  }

}
