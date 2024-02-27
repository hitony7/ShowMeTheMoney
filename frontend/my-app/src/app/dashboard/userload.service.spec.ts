import { TestBed } from '@angular/core/testing';

import { UserloadService } from './userload.service';

describe('UserloadService', () => {
  let service: UserloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
