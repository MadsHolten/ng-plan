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
  public boundingBox: THREE.Box3; // Vounding box of full geometry
  public centroid: THREE.Vector3; // Centroid of full geometry
  public size: THREE.Vector3;     // Size of full geometry

  @ViewChild('canvas')
  private canvasRef: ElementRef;

  constructor() {
    this.render = this.render.bind(this);
  }

  ngOnChanges(changes: SimpleChanges) {

    if(Array.isArray(changes.data.currentValue)){

      if(!this.data[0].geometry) return;

      // Construct new objects
      this.spaces = this.data.map(item => {
        if(Array.isArray(item.geometry)){
          item.geometry = item.geometry.join("\n");
        }
        return item;
      });

      // this.spaces = this.spaces[1];

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

      // var light = new THREE.PointLight(0xffffff, 1, 1000);
      // light.position.set(0, 0, 100);
      // this.scene.add(light);

      // var light = new THREE.PointLight(0xffffff, 1, 1000);
      // light.position.set(0, 0, -100);
      // this.scene.add(light);
  }

  private appendMeshes(spaces) {
    
    // Initialize bbox
    var bBoxFull = new THREE.Box3();

    // Add OBJ graphics
    var objLoader = new THREE.OBJLoader();
    var colorScheme = d3.schemeCategory10;

    // Make array
    if(!Array.isArray(spaces)) spaces = [spaces];

    for(var space of spaces){

      var myObj = objLoader.parse(space.geometry);
      var randInt = Math.floor(Math.random() * 10);
      var color = new THREE.Color(colorScheme[randInt]);

      // Define material
      var material = new THREE.MeshBasicMaterial( { color: color, side: THREE.DoubleSide, opacity: 0.5, transparent: true, depthWrite: false } );

      myObj.name = space.name;

      var invalidPos;
      myObj.traverse(child => {
        if ( child instanceof THREE.Mesh ) {
          child.name = space.name;
          child.material = material;

          // Get position attribute
          var x: any = child.geometry.clone();
          invalidPos = x.attributes.position.array.includes(NaN);
        }
      });

      // Add if not position includes NaN value(s)
      if(!invalidPos){
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
      }else{
        console.log("Space " + space.uri + " has invalid position attributes.")
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
    this.camera.lookAt( this.centroid );
    this.camera.up.set(0,0,1);    // z-axis up
    // this.zoomExtents();
    
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
    this.controls.minDistance = -Infinity;
    this.controls.maxDistance = Infinity;

    // set camera to rotate around center of loaded object
    this.controls.target = this.centroid;

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

  private zoomExtents() {

    var offset = 1.25;

    // Get geometry size
    var size = new THREE.Vector3();
    this.boundingBox.getSize(size);
    this.size = size;

    // Get bounding sphere
    var sphere = new THREE.Sphere();
    // this.boundingBox.getBoundingSphere(sphere);

    // Initially set camera to center of geometry
    this.camera.position.set(this.centroid.x,this.centroid.y,this.centroid.z);

    var fov = this.camera.fov * ( Math.PI / 180 );
    // Calculate the camera distance
    var distance = Math.abs( sphere.radius*2 / Math.sin( fov / 2 ) );
    console.log(distance);

    // Move camera to the edge of the furthest away element + an offset factor
    this.camera.translateZ(-(distance));

    // Get distance from camera to nearest element
    var dist = (sphere.radius * offset) - sphere.radius;

    // Height of object
    var height = this.size.y;

    // Set camera direction
    this.camera.lookAt(this.centroid);

    // Set camera fof
    // fov = 2 * Math.atan( height / ( 2 * dist ) ) * ( 180 / Math.PI );
    this.camera.fov = 2 * Math.atan( height / ( 2 * dist ) ) * ( 180 / Math.PI );

    // Set camera far plan
    this.camera.far = 30000;
    this.camera.focus = dist;

    console.log(sphere);

    this.camera.up.set(0,0,1);    // z-axis up

    this.camera.updateMatrix();

    // // get the max side of the bounding box (fits to width OR height as needed )
    // const maxDim = Math.max( size.x, size.y, size.z );
    // // const fov = this.camera.fov * ( Math.PI / 180 );
    // let cameraZ = Math.abs( maxDim / 4 * Math.tan( fov * 2 ) );

    // cameraZ *= offset; // zoom out a little so that objects don't fill the screen

    // // Position camera according to geometry size
    // // this.camera.position.x = this.centroid.x > 0 ? this.centroid.x + 2*size.x : this.centroid.x - 2*size.x;
    // // this.camera.position.y = this.centroid.y + 2*size.y;
    // // this.camera.position.z = cameraZ;

    // const minZ = this.boundingBox.min.z;
    // const cameraToFarEdge = ( minZ < 0 ) ? -minZ + cameraZ : cameraZ - minZ;

    // // this.camera.near = -10000;
    // // this.camera.far = 10000;
    // var fov = 2 * Math.atan( this.size.z / ( 2 * maxDim ) ) * ( 180 / Math.PI ); // in degrees
    // this.camera.fov = fov;

    // this.camera.up.set(0,0,1);    // z-axis up

    // console.log(this.centroid);
    // console.log(this.size);
    // this.camera.position.set(this.centroid.x,this.centroid.y,this.centroid.z);
    // this.camera.translateY(-maxDim);

    // this.camera.updateMatrix();

    // if ( this.controls ) {
      
    //   // set camera to rotate around center of loaded object
    //   this.controls.target = this.centroid;

    //   // // prevent camera from zooming out far enough to create far plane cutoff
    //   // this.controls.maxDistance = cameraToFarEdge * 2;

    //   this.controls.saveState();

    // } else {

    //   this.camera.lookAt(this.centroid);

    // }

  }

}
