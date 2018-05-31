import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PlanComponent } from './plan.component';

// Angular material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule, 
         MatTooltipModule } from '@angular/material';

// Directives
import { CanvasEventsDirective } from './canvas-events.directive';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTooltipModule
  ],
  declarations: [PlanComponent, CanvasEventsDirective],
  exports: [PlanComponent]
})
export class PlanModule { }
