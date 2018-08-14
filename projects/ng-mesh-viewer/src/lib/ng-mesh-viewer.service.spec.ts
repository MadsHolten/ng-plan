import { TestBed, inject } from '@angular/core/testing';

import { NgMeshViewerService } from './ng-mesh-viewer.service';

describe('NgMeshViewerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgMeshViewerService]
    });
  });

  it('should be created', inject([NgMeshViewerService], (service: NgMeshViewerService) => {
    expect(service).toBeTruthy();
  }));
});
