import { TestBed } from '@angular/core/testing';

import { AvioCompaniesService } from './avio-companies.service';

describe('AvioCompaniesService', () => {
  let service: AvioCompaniesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvioCompaniesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
