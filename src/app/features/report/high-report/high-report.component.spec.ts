import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighReportComponent } from './high-report.component';

describe('HighReportComponent', () => {
  let component: HighReportComponent;
  let fixture: ComponentFixture<HighReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HighReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
