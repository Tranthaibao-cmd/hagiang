import { TestBed } from '@angular/core/testing';

import { ShareFunctionService } from './share-function.service';

describe('ShareFunctionService', () => {
  let service: ShareFunctionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareFunctionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
