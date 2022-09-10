import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotseatmakingViewComponent } from './hotseatmaking-view.component';

describe('HotseatmakingViewComponent', () => {
  let component: HotseatmakingViewComponent;
  let fixture: ComponentFixture<HotseatmakingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotseatmakingViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotseatmakingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
