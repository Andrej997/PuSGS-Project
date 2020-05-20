import { TestBed } from '@angular/core/testing';

import { PlanSeatServiceService } from './plan-seat-service.service';

describe('PlanSeatServiceService', () => {
  let service: PlanSeatServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanSeatServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
