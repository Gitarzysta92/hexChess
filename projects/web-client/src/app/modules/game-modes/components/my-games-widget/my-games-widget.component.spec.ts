import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGamesWidgetComponent } from './my-games-widget.component';

describe('MyGamesWidgetComponent', () => {
  let component: MyGamesWidgetComponent;
  let fixture: ComponentFixture<MyGamesWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyGamesWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyGamesWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
