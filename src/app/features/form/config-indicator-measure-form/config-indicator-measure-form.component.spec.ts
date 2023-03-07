import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigIndicatorMeasureFormComponent } from './config-indicator-measure-form.component';

describe('ConfigIndicatorMeasureFormComponent', () => {
  let component: ConfigIndicatorMeasureFormComponent;
  let fixture: ComponentFixture<ConfigIndicatorMeasureFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigIndicatorMeasureFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigIndicatorMeasureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
