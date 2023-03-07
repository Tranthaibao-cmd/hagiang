import { TestBed } from '@angular/core/testing';

import { ProvinceReportService } from './province-report.service';

describe('ProvinceReportService', () => {
  let service: ProvinceReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProvinceReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
