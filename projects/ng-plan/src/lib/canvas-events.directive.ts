import { Directive, Output, HostListener, EventEmitter } from '@angular/core';

@Directive({ selector: '[canvasEvents]' })
export class CanvasEventsDirective {

  @Output() zoomOut = new EventEmitter();
  @Output() zoomIn = new EventEmitter();
  @Output() moveInit = new EventEmitter();
  @Output() move = new EventEmitter();
  @Output() moveEnd = new EventEmitter();
  @Output() panMode = new EventEmitter();
  @Output() addNodeMode = new EventEmitter();

  private mouseDown: boolean = false;
  private dragMode: boolean = false;

  private clickX;
  private clickY;

  @HostListener('mousewheel', ['$event']) onMouseWheelChrome(event: any) {
    this.mouseWheelFunc(event);
  }

  @HostListener('DOMMouseScroll', ['$event']) onMouseWheelFirefox(event: any) {
    this.mouseWheelFunc(event);
  }

  @HostListener('onmousewheel', ['$event']) onMouseWheelIE(event: any) {
    this.mouseWheelFunc(event);
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(ev:KeyboardEvent){
      if(ev.key == "ArrowDown"){
        this.zoomIn.emit(ev);
      }
      if(ev.key == "ArrowUp"){
        this.zoomOut.emit(ev);
      }
      if(ev.key == "Alt"){
        // enable drag mode if holding Alt
        this.dragMode = true;
        this.panMode.emit(true);
      }
      if(ev.key == "Control"){
        this.addNodeMode.emit(true);
      }
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(ev:KeyboardEvent){
      if(ev.key == "Alt"){
        // disable drag mode if releasing Alt
        this.dragMode = false;
        this.panMode.emit(false);
      }
      if(ev.key == "Control"){
        this.addNodeMode.emit(false);
      }
      
  }

  @HostListener('mousedown', ['$event'])
  onMouseClick(ev: MouseEvent) {

      this.mouseDown = true;

      // enable drag mode if clicking middle button
      if(ev.button == 1) this.dragMode = true;

      if(this.dragMode){
        this.clickX = ev.offsetX;
        this.clickY = ev.offsetY;
        this.panMode.emit(true);
        this.moveInit.emit([ev.offsetX,ev.offsetY]);
      }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(ev: MouseEvent) {
      if(this.dragMode && this.mouseDown){
          this.move.emit([ev.offsetX-this.clickX,ev.offsetY-this.clickY]);
      }
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(ev: MouseEvent) {
      this.mouseDown = false;
      if(this.dragMode){
        this.dragMode = false;
        this.panMode.emit(false);
        this.moveEnd.emit([ev.offsetX-this.clickX,ev.offsetY-this.clickY]);
      }
  }

  mouseWheelFunc(event: any) {
    var event = window.event || event; // old IE support
    var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
    if(delta > 0) {
        this.zoomIn.emit(event);
    } else if(delta < 0) {
        this.zoomOut.emit(event);
    }
    // for IE
    event.returnValue = false;
    // for Chrome and Firefox
    if(event.preventDefault) {
        event.preventDefault();
    }
  }
}