import { TestBed } from '@angular/core/testing';

import { IndicatorGroupService } from './indicator-group.service';

describe('IndicatorGroupService', () => {
  let service: IndicatorGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndicatorGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
