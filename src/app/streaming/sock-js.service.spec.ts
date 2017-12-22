import { TestBed, inject } from '@angular/core/testing';

import { SockJsService } from './sock-js.service';

describe('SockJsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SockJsService]
    });
  });

  it('should be created', inject([SockJsService], (service: SockJsService) => {
    expect(service).toBeTruthy();
  }));
});
