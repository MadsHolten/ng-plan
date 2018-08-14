import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgMeshViewer2Component } from './ng-mesh-viewer2.component';

describe('NgMeshViewer2Component', () => {
  let component: NgMeshViewer2Component;
  let fixture: ComponentFixture<NgMeshViewer2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgMeshViewer2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgMeshViewer2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
