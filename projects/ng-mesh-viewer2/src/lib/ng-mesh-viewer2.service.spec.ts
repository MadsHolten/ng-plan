import { TestBed, inject } from '@angular/core/testing';

import { NgMeshViewer2Service } from './ng-mesh-viewer2.service';

describe('NgMeshViewer2Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgMeshViewer2Service]
    });
  });

  it('should be created', inject([NgMeshViewer2Service], (service: NgMeshViewer2Service) => {
    expect(service).toBeTruthy();
  }));
});
