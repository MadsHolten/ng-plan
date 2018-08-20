import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Project modules
import { PlanModule } from 'ng-plan';
import { MeshViewerModule } from 'ng-mesh-viewer';

// Angular material
import { MatButtonModule } from '@angular/material';

// Draggable
import { AngularDraggableModule } from 'angular2-draggable';

// Markdown pipe
import { MarkdownToHtmlModule } from 'markdown-to-html-pipe';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    PlanModule,
    MeshViewerModule,
    MatButtonModule,
    BrowserAnimationsModule,
    AngularDraggableModule,
    MarkdownToHtmlModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
