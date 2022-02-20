import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchmakingViewComponent } from './matchmaking-view.component';

describe('MatchmakingViewComponent', () => {
  let component: MatchmakingViewComponent;
  let fixture: ComponentFixture<MatchmakingViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchmakingViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchmakingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
