import { TestBed } from '@angular/core/testing';

import { OponentsService } from './oponents.service';

describe('OponentsService', () => {
  let service: OponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
