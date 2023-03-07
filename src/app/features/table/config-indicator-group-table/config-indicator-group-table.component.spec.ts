import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigIndicatorGroupTableComponent } from './config-indicator-group-table.component';

describe('ConfigIndicatorGroupTableComponent', () => {
  let component: ConfigIndicatorGroupTableComponent;
  let fixture: ComponentFixture<ConfigIndicatorGroupTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigIndicatorGroupTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigIndicatorGroupTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
