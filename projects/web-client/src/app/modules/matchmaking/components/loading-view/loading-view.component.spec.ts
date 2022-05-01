import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchmakingLoadingViewComponent } from './loading-view.component';

describe('LoadingViewComponent', () => {
  let component: MatchmakingLoadingViewComponent;
  let fixture: ComponentFixture<MatchmakingLoadingViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchmakingLoadingViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchmakingLoadingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
