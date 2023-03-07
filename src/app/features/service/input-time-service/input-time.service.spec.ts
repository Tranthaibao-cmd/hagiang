import { TestBed } from '@angular/core/testing';

import { InputTimeService } from './input-time.service';

describe('InputTimeService', () => {
  let service: InputTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
