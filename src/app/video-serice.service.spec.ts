import { TestBed } from '@angular/core/testing';

import { VideoSericeService } from './video-serice.service';

describe('VideoSericeService', () => {
  let service: VideoSericeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoSericeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
