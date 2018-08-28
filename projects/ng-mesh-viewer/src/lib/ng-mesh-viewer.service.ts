import { Injectable } from '@angular/core';
import * as THREE from 'three';

export interface OBJGeometry {
    zones?: string[],
    elements?: string[],
    geometryPreprocessing: GeomPreProcess
}

export interface GeomPreProcess {
    scaleFactor: number,
    offset: number[]
}

@Injectable({
  providedIn: 'root'
})
export class NgMeshViewerService {

  constructor() { }

  public async processOBJ(data): Promise<OBJGeometry> {
   
      // Desired max dimension (max width, height or depth)
      var maxDim = 1;

      // Get bounding box of all geometry received
      var boundingBox = await this.getBoundingBox(data);

      var scaleFactor = await this.calculateScaleFactor(boundingBox, maxDim);

      var offset = await this.calculateOffsetFactors(boundingBox, scaleFactor, maxDim);

      /**
       * SCALE AND OFFSET ORIGINAL
       */
      var zones = [];
      var elements = [];
      data.map(obj => {

          var objLines = obj.geometry.split('\n');

          // Loop over lines in OBJ file
          var objLinesNew = objLines.map(l => {
              
              // Scale and offset vertices
              if(l.startsWith('v ')){

                  // split string ['v', 'xCoordinate', 'yCoordinate', 'zCoordinate']
                  var v = l.split(' ');

                  // Move and scale
                  var x = v[1]*scaleFactor + offset[0];
                  var y = v[2]*scaleFactor + offset[1];
                  var z = v[3]*scaleFactor + offset[2];

                  // Create new vertice in OBJ syntax
                  l = `v ${x} ${y} ${z}`;
              }

              return l;
          });

          var geometryNew = objLinesNew.join('\n');
          obj.geometry = geometryNew;

          if(obj.type == "Zone"){
            zones.push(obj);
          }else if(obj.type == "Element"){
            elements.push(obj);
          }

          return;

      });

      // Append pre-processing data to array
      var geometryPreprocessing = {
          scaleFactor: scaleFactor,
          offset: offset
      }

      return {zones: zones, elements: elements, geometryPreprocessing: geometryPreprocessing};

  }

  private calculateScaleFactor = (boundingBox, maxDim): Promise<number> => {
    return new Promise((resolve, reject) => {
        // Get box size
        var size = new THREE.Vector3();
        boundingBox.getSize(size);

        // Get largest dimension
        var arr: number[] = []
        size.toArray(arr);
        var largest = Math.max(...arr);

        // Calculate scale-factor
        var scaleFactor = maxDim/largest;

        resolve(scaleFactor);
    });
  }

  private calculateOffsetFactors = (boundingBox,scaleFactor,maxDim): Promise<number[]> => {
    return new Promise((resolve, reject) => {
        // Get centroid
        var centroid = new THREE.Vector3();
        boundingBox.getCenter(centroid);

        // Scale centroid
        var arr: number[] = []
        centroid.toArray(arr);
        arr = arr.map(n => n*scaleFactor);

        // Calculate offset
        var offsetX = maxDim/2 - arr[0];
        var offsetY = maxDim/2 - arr[1];
        var offsetZ = maxDim/2 - arr[2];

        resolve([offsetX, offsetY, offsetZ]);
    });
  }

  private getBoundingBox = (data): Promise<THREE.Box3> => {
      return new Promise((resolve, reject) => {

        // Create default material for points
        var color = new THREE.Color( "#000000" );
        var mat = new THREE.PointsMaterial( { size: 2, color: color } );

        // Instantiate bounding box
        var boundingBox = new THREE.Box3();

        data.forEach(el => {
            if(el.geometry) {
                var objLines = el.geometry.split('\n');
                var verticesArr = objLines.filter(l => l.startsWith('v '));
                verticesArr.forEach(v => {
                    // split string ['v', 'xCoordinate', 'yCoordinate', 'zCoordinate']
                    v = v.split(' ');
    
                    // Define vertice
                    var a = new THREE.Vector3( v[1], v[2], v[3] );
    
                    // add to bounding box
                    var geo = new THREE.Geometry();
                    geo.vertices.push(a);
                    var point = new THREE.Points( geo, mat );
                    boundingBox.expandByObject(point);
                });
            }
    
        });

        resolve(boundingBox);

      });
  };

}