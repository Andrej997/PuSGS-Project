import { TestBed } from '@angular/core/testing';

import { AeroplaneServiceService } from './aeroplane-service.service';

describe('AeroplaneServiceService', () => {
  let service: AeroplaneServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AeroplaneServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
