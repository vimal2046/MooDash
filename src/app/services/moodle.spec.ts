import { TestBed } from '@angular/core/testing';

import { Moodle } from './moodle';

describe('Moodle', () => {
  let service: Moodle;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Moodle);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
