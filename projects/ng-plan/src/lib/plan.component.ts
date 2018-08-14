import { Component, Input, Output, EventEmitter, AfterViewInit, OnChanges, SimpleChanges, ViewChild, ElementRef, HostListener } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

import * as d3 from 'd3-decompose';  // takes SVG or CSS3 transform strings and converts them into usable values
import * as d3p from 'd3-polygon';   // Operations on polygons

export interface Room {
    name: string;
    polygons: string[];
}

@Component({
    selector: 'ng-plan',
    templateUrl: './plan.component.html',
    styleUrls: ['./plan.component.css']
})
export class PlanComponent implements AfterViewInit {

    @Output() clickedRoom = new EventEmitter();             // Clicked room
    @Output() clickedCanvas = new EventEmitter();

    @Input() private data;                       //geoJSON
    @Input() private colors;                     //color schema
    @Input() public centroids: boolean;          //color schema
    @Input() public toolbar: boolean;            //toolbar visible?
    @Input() private selected: string[];         //Spaces to be highlighted

    // Styles
    @Input() public selectedColor: string = '#ebefe4';
    @Input() public defaultColor: string = '#f2flec';

    public rooms;

    // Canvas
    private canvasWidth;
    private canvasHeight;
    private canvasCentroid;

    // Scale / offset
    // These factors are calculated from geometry extends
    private baseScale = 0.9;
    private baseOffsetX = 0;
    private baseOffsetY = 0;

    // geometry
    public transform = `translate(${this.baseOffsetX},${this.baseOffsetY}) scale(${this.baseScale},${this.baseScale})`;
    private movedX: number = 0; // store move state
    private movedY: number = 0; // store move state
    public scaled: number = 1 // store scale state
    public boundingBox;         // Stores boundingBox as [xMin, yMin, xMax, yMax]

    // modes
    public panMode: boolean = false;
    public addNodeMode: boolean = false;

    @ViewChild('canvas') private planContainer: ElementRef;

    constructor(
      private matIconRegistry: MatIconRegistry,
      private domSanitizer: DomSanitizer
    ) {}

    ngAfterViewInit(){
        this.getCanvasSize();
        // this.addSVGicons();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.data && changes.data.currentValue) {
            this.data = changes.data.currentValue;
            this.extractRooms();
            this.getScaleOffset();
            this.zoomExtents();
        }
        if (changes.colors && changes.colors.currentValue){
            this.defineColors();
        }
        if (changes.selected){
            this.updateSelection();
        }
    }

    // addSVGicons(){
    //   this.matIconRegistry.addSvgIcon(
    //     "zoom_extents",
    //     this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/zoom_extents.svg")
    //   );
    // }

    updateSelection(){
        if(!this.rooms) return;
        this.rooms = this.rooms.map(x => {
            if(this.selected.indexOf(x.uri) != -1){
                x.selected = true;
            }else{
                x.selected = false;
            }
            return x;
        })
    }

    defineColors(){
        this.rooms.map(x => {
            var match = this.colors.filter(y => y.uri == x.uri);
            if(match.length > 0){
                x.color = match[0].color;
                x.description = match[0].value;
            }
            return x;
        });
    }

    getCanvasSize(){
        const element = this.planContainer.nativeElement;
        const size = element.getBoundingClientRect();
        this.canvasWidth = size.width;
        this.canvasHeight = size.height;
        this.canvasCentroid = [this.canvasWidth/2, this.canvasHeight/2];        
    }

    extractRooms(){
        if(!this.data.features) return this.rooms = null;

        // For bounding box [xMin, yMin, xMax, yMax]
        var xMin;
        var yMin;
        var xMax;
        var yMax;
        
        this.rooms = this.data.features.map(room => {
            var polygons = [];
            var roomPath = '';
            var centroid;
            if(room.geometry && room.geometry.type == "Polygon"){
                
                var roomPolygons = [];  // Allow multi polygons if doughnut room
                room.geometry.coordinates.forEach(polygon => {

                    var points = '';
                    var path = '';
                    // Reflect y coordinates to fit browser coordinate system and extract to polygon
                    polygon.map((coordinate,index) => {
                        var x = coordinate[0];
                        var y = -coordinate[1]; // reflect since SVG uses reflected coordinate system

                        points+= `${x},${y} `;
                        path+= (index == 0) ? `M${x},${y} ` : `L${x},${y} `;

                        coordinate[1] = y; // Update polygon with new y

                        // Get bounding box
                        if(!xMin || x < xMin) xMin = x;
                        if(!xMax || x > xMax) xMax = x;
                        if(!yMin || y < yMin) yMin = y;
                        if(!yMax || y > yMax) yMax = y;

                        return coordinate;
                    })
                    points = points.trim();    // remove last space
                    path = path.trim();         // remove last space

                    // Get polygon centroid from first polygon
                    if(roomPolygons.length < 1){
                        centroid = d3p.polygonCentroid(polygon);
                    }

                    roomPolygons.push(points);
                    roomPath+=path;
                });
                polygons.push(roomPolygons);
            }
            var name = room.properties.name;
            var uri = room.properties.uri;
            var color = room.properties.color ? room.properties.color : this.defaultColor;
            var description = room.properties.description ? room.properties.description : '';
            
            // Store bounding box
            this.boundingBox = [xMin, yMin, xMax, yMax];

            return {name: name, uri: uri, description: description, color: color, polygons: polygons, path:roomPath, centroid: centroid}
        });
    }

    getScaleOffset() {   
        // Calculate data size
        var bb = this.boundingBox;
        var dataWidth = bb[2]-bb[0];
        var dataHeight = bb[3]-bb[1];

        // Calculate scale factors
        var scaleWidth = this.canvasWidth/dataWidth;
        var scaleHeight = this.canvasHeight/dataHeight;
        var scale = Math.min(scaleHeight,scaleWidth);

        var scaledDataCentroid = [scale*(bb[0]+dataWidth/2), scale*(bb[1]+dataHeight/2)];

        // Calculate offset factors
        var offsetX = this.canvasCentroid[0]-scaledDataCentroid[0];
        var offsetY = this.canvasCentroid[1]-scaledDataCentroid[1];

        // Set global variables
        this.baseOffsetX = offsetX;
        this.baseOffsetY = offsetY;
        this.baseScale = scale;
    
        return [scale,offsetX,offsetY]
    }

    move(displacement){
        if(displacement){
            this.zoomHandler(undefined,displacement);
        }
    }

    moveEnd(displacement){
        // Update moved coordinates
        this.movedX = this.movedX+displacement[0];
        this.movedY = this.movedY+displacement[1];
    }

    onWindowResize(){
        this.getCanvasSize();
        this.getScaleOffset();
        this.zoomExtents();
    }

    zoomExtents(){
        this.scaled = this.baseScale*0.95;
        this.movedX = 0;
        this.movedY = 0;
        this.zoomHandler();
    }

    zoomOut(ev){
        // Calculate current scale
        var scaleFactor = this.baseScale/5;
        this.scaled = this.scaled-scaleFactor;
        this.zoomHandler(ev);
    }

    zoomIn(ev){
        var scaleFactor = this.baseScale/5;
        this.scaled = this.scaled+scaleFactor;
        this.zoomHandler(ev);
    }

    zoomHandler(ev?,displacement?){

        var trns1 = '';

        if(displacement){
            var dx = this.baseOffsetX + this.movedX + displacement[0];
            var dy = this.baseOffsetY + this.movedY + displacement[1];
        }else{
            dx = this.baseOffsetX + this.movedX;
            dy = this.baseOffsetY + this.movedY;
        }

        // This should be adjusted to center at mouse position while zooming

        // if(ev && ev.offsetX){
        //     // Get mouse position relative to canvas center point and move
        //     var mx = ev.offsetX-this.canvasCentroid[0];
        //     var my = ev.offsetY-this.canvasCentroid[1];
        //     var dx2 = mx;
        //     var dy2 = my;
        //     trns1 = `translate(${dx2},${dy2})`;
        //     console.log(trns1)
        // }

        var oldScale = d3.decompose(this.transform).scale;
        var oldTrns = d3.decompose(this.transform).translate;
        var scale = `scale(${this.scaled},${this.scaled})`;

        var trns = `translate(${dx},${dy})`;

        // Update transform attribute
        this.transform = trns+trns1+scale;
        // this.transform = this.transform.replace(oldScale,scale);
    }

    selectRoom(ev, room){
        // Get coordinates
        var scale = this.scaled;
        var offsetX = this.baseOffsetX+this.movedX;
        var offsetY = this.baseOffsetY+this.movedY;
        var screenX = ev.offsetX;
        var screenY = ev.offsetX;

        var x = (screenX-offsetX)/scale;
        var y = (screenY-offsetY)/scale;
        var coordinates = [x,-y];

        // Emit event
        this.clickedRoom.emit({uri: room.uri, coordinates: coordinates});
    }

    onCanvasClick(ev){
        if(ev.target.id != 'canvas') return;
        this.clickedCanvas.emit();
    }

}