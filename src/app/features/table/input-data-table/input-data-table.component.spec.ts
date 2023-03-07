import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDataTableComponent } from './input-data-table.component';

describe('InputDataTableComponent', () => {
  let component: InputDataTableComponent;
  let fixture: ComponentFixture<InputDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputDataTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
