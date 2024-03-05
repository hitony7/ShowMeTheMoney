import { TestBed } from '@angular/core/testing';

import { GetuseridService } from './getuserid.service';

describe('GetuseridService', () => {
  let service: GetuseridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetuseridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
