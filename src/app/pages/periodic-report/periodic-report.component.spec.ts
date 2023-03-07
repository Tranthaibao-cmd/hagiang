import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodicReportComponent } from './periodic-report.component';

describe('PeriodicReportComponent', () => {
  let component: PeriodicReportComponent;
  let fixture: ComponentFixture<PeriodicReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeriodicReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodicReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
