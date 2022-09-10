import { TestBed } from '@angular/core/testing';

import { OfflineGameplayService } from './offline-gameplay.service';

describe('OfflineGameplayService', () => {
  let service: OfflineGameplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfflineGameplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
