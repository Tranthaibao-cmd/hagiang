import { TestBed } from '@angular/core/testing';

import { IndicatorYearService } from './indicator-year.service';

describe('IndicatorYearService', () => {
  let service: IndicatorYearService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndicatorYearService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
