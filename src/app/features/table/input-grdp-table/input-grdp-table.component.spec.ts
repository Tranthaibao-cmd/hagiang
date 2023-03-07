import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputGrdpTableComponent } from './input-grdp-table.component';

describe('InputGrdpTableComponent', () => {
  let component: InputGrdpTableComponent;
  let fixture: ComponentFixture<InputGrdpTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputGrdpTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputGrdpTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
