import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgMeshViewerComponent } from './ng-mesh-viewer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NgMeshViewerComponent],
  exports: [NgMeshViewerComponent]
})
export class MeshViewerModule { }