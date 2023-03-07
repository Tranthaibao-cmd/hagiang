import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigInputTableComponent } from './config-input-table.component';

describe('ConfigInputTableComponent', () => {
  let component: ConfigInputTableComponent;
  let fixture: ComponentFixture<ConfigInputTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigInputTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigInputTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
