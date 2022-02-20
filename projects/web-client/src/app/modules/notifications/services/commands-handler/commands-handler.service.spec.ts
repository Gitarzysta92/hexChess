import { TestBed } from '@angular/core/testing';

import { CommandsHandlerService } from './commands-handler.service';

describe('CommandsHandlerService', () => {
  let service: CommandsHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommandsHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
