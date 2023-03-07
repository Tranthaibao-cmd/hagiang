import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigDistrictTableComponent } from './config-district-table.component';

describe('ConfigDistrictTableComponent', () => {
  let component: ConfigDistrictTableComponent;
  let fixture: ComponentFixture<ConfigDistrictTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigDistrictTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigDistrictTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
