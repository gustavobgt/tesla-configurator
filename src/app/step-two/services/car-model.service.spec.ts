import { TestBed } from '@angular/core/testing';

import { CarOptionsService } from './car-options.service';

describe('CarOptionsService', () => {
  let service: CarOptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarOptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
