import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigUnitTableComponent } from './config-unit-table.component';

describe('ConfigUnitTableComponent', () => {
  let component: ConfigUnitTableComponent;
  let fixture: ComponentFixture<ConfigUnitTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigUnitTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigUnitTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
