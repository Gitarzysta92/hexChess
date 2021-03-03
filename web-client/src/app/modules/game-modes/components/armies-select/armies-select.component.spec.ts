import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmiesSelectComponent } from './armies-select.component';

describe('ArmiesSelectComponent', () => {
  let component: ArmiesSelectComponent;
  let fixture: ComponentFixture<ArmiesSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArmiesSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArmiesSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
