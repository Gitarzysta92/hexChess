import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyArmiesWidgetComponent } from './my-armies-widget.component';

describe('MyArmiesWidgetComponent', () => {
  let component: MyArmiesWidgetComponent;
  let fixture: ComponentFixture<MyArmiesWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyArmiesWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyArmiesWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
