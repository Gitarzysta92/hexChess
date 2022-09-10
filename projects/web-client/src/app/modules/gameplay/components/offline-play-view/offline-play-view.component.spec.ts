import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflinePlayViewComponent } from './offline-play-view.component';

describe('OfflinePlayViewComponent', () => {
  let component: OfflinePlayViewComponent;
  let fixture: ComponentFixture<OfflinePlayViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfflinePlayViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfflinePlayViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
