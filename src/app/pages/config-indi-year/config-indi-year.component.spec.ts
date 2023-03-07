import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigIndiYearComponent } from './config-indi-year.component';

describe('ConfigIndiYearComponent', () => {
  let component: ConfigIndiYearComponent;
  let fixture: ComponentFixture<ConfigIndiYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigIndiYearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigIndiYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
