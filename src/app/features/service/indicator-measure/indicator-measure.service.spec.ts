import { TestBed } from '@angular/core/testing';

import { IndicatorMeasureService } from './indicator-measure.service';

describe('IndicatorMeasureService', () => {
  let service: IndicatorMeasureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndicatorMeasureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
