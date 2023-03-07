import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SynthesisReportComponent } from './synthesis-report.component';

describe('SynthesisReportComponent', () => {
  let component: SynthesisReportComponent;
  let fixture: ComponentFixture<SynthesisReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SynthesisReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SynthesisReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
