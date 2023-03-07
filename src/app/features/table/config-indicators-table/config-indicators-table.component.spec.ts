import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigIndicatorsTableComponent } from './config-indicators-table.component';

describe('ConfigIndicatorsTableComponent', () => {
  let component: ConfigIndicatorsTableComponent;
  let fixture: ComponentFixture<ConfigIndicatorsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigIndicatorsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigIndicatorsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
