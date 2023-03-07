import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPlanTableComponent } from './input-plan-table.component';

describe('InputPlanTableComponent', () => {
  let component: InputPlanTableComponent;
  let fixture: ComponentFixture<InputPlanTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputPlanTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputPlanTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
