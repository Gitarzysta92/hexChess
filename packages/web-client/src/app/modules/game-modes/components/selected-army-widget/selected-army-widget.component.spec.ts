import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedArmyWidgetComponent } from './selected-army-widget.component';

describe('SelectedArmyWidgetComponent', () => {
  let component: SelectedArmyWidgetComponent;
  let fixture: ComponentFixture<SelectedArmyWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedArmyWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedArmyWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
