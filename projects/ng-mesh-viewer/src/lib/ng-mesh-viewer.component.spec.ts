import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgMeshViewerComponent } from './ng-mesh-viewer.component';

describe('NgMeshViewerComponent', () => {
  let component: NgMeshViewerComponent;
  let fixture: ComponentFixture<NgMeshViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgMeshViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgMeshViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
