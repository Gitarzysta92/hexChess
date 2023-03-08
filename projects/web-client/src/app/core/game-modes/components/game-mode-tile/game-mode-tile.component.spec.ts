import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameModeTileComponent } from './game-mode-tile.component';

describe('GameModeTileComponent', () => {
  let component: GameModeTileComponent;
  let fixture: ComponentFixture<GameModeTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameModeTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameModeTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
