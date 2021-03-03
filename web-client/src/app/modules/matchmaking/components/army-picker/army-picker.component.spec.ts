import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmyPickerComponent } from './army-picker.component';

describe('ArmyPickerComponent', () => {
  let component: ArmyPickerComponent;
  let fixture: ComponentFixture<ArmyPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArmyPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArmyPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
