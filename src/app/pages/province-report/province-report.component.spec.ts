import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinceReportComponent } from './province-report.component';

describe('ProvinceReportComponent', () => {
  let component: ProvinceReportComponent;
  let fixture: ComponentFixture<ProvinceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvinceReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvinceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
