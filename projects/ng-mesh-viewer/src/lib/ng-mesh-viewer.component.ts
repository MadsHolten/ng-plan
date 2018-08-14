import { Component, OnChanges, SimpleChanges, Input, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three';
import OBJLoader from 'three-obj-loader';
OBJLoader(THREE);
import { OrbitControls } from '@avatsaev/three-orbitcontrols-ts';
import * as d3 from 'd3-scale-chromatic';

@Component({
  selector: 'ng-mesh-viewer',
  templateUrl: 'ng-mesh-viewer.component.html',
  styles: [`
    canvas {
        width: 100%;
        height: 100%;
    }
    .button-row{
      position: absolute;
      z-index: 100;
      float: right;
    }
  `]
})
export class NgMeshViewerComponent implements OnChanges {

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
  public boundingBox: THREE.Box3;
  public centroid: THREE.Vector3;

  @ViewChild('canvas')
  private canvasRef: ElementRef;

  constructor() {
    this.render = this.render.bind(this);
  }

  ngOnChanges(changes: SimpleChanges) {

    if(Array.isArray(changes.data.currentValue)){

      // Construct new objects
      this.spaces = this.data.map(item => {
        item.geometry = item.geometry.join("\n");
        return item;
      });

      this.createScene();
      this.appendMeshes(this.spaces);
      this.createCamera();
      this.createRenderer();
      this.createControls();
      this.render();

    }

  }

  public render() {
    this.renderer.render(this.scene, this.camera);
  }

  private createScene() {
      this.scene = new THREE.Scene();

      var light = new THREE.PointLight(0xffffff, 1, 1000);
      light.position.set(0, 0, 100);
      this.scene.add(light);

      var light = new THREE.PointLight(0xffffff, 1, 1000);
      light.position.set(0, 0, -100);
      this.scene.add(light);
  }

  private appendMeshes(spaces) {
    
    // Initialize bbox
    var bBoxFull = new THREE.Box3();

    // Add OBJ graphics
    var objLoader = new THREE.OBJLoader();
    var colorScheme = d3.schemeCategory10;

    for(var space of spaces){

      var myObj = objLoader.parse(space.geometry);
      var randInt = Math.floor(Math.random() * 10);
      var color = new THREE.Color(colorScheme[randInt]);

      // Define material
      var material = new THREE.MeshBasicMaterial( { color: color, side: THREE.DoubleSide, opacity: 0.5, transparent: true, depthWrite: false } );

      myObj.traverse(child => {
        if ( child instanceof THREE.Mesh ) {
          child.name = space.name;
          child.material = material;
        }
      });

      myObj.name = space.name;

      this.scene.add(myObj);

      // Append to bounding box
      bBoxFull.expandByObject(myObj);

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

    }

    // Set the bounding box to the finally expanded bBoxFull
    this.boundingBox = bBoxFull;

    // Get centroid of full bounding box to set camera view location
    var ct = new THREE.Vector3();
    bBoxFull.getCenter(ct);

    this.centroid = ct;

    // Show bounding box
    if(this.showBoundingBox){
      var color = new THREE.Color( "red" );
      var helper = new THREE.Box3Helper( bBoxFull, color );
      this.scene.add( helper );
    }
    
  }

  private createCamera() {
    let aspectRatio = this.getAspectRatio();
    var fov = 75;   // vertical field of view
    var near = 0.1; // near plane
    var far = 2000;  // far plane

    this.camera = new THREE.PerspectiveCamera( fov, aspectRatio, near, far );

    // Get geometry size
    var size = new THREE.Vector3();
    this.boundingBox.getSize(size);

    // Position camera according to geometry size
    this.camera.position.x = this.centroid.x + 2*size.x;
    this.camera.position.y = this.centroid.y + 2*size.y;
    this.camera.position.z = this.centroid.z + 2*size.z;

    this.camera.up.set(0,0,1);    // z-axis up
    this.camera.lookAt(this.centroid);
  }

  private createRenderer() {
    var canvas = this.canvasRef.nativeElement;
    this.renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true, alpha: true } );
    this.renderer.setClearColor( 0xffffff, 0);
    this.renderer.setSize( window.innerWidth, window.innerHeight );
  }

  private createControls(){
    this.controls = new OrbitControls( this.camera, this.renderer.domElement );
    this.controls.minPolarAngle = 0;
    this.controls.maxPolarAngle = Math.PI;
    this.controls.minDistance = 0;
    this.controls.maxDistance = Infinity;
    this.controls.addEventListener('change', this.render);
  }

  private getAspectRatio(): number {
      var canvas = this.canvasRef.nativeElement;
      let height = canvas.clientHeight;
      if (height === 0) {
          return 0;
      }
      return canvas.clientWidth / canvas.clientHeight;
  }

}
