import { TestBed } from '@angular/core/testing';

import { GrdpService } from './grdp.service';

describe('GrdpService', () => {
  let service: GrdpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrdpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
