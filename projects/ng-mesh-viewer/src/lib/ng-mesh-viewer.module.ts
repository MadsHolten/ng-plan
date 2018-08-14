import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgMeshViewerComponent } from './ng-mesh-viewer.component';

// Directives
import { CanvasEventsDirective } from './canvas-events.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NgMeshViewerComponent, CanvasEventsDirective],
  exports: [NgMeshViewerComponent]
})
export class MeshViewerModule { }
