import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputGrdpComponent } from './input-grdp.component';

describe('InputGrdpComponent', () => {
  let component: InputGrdpComponent;
  let fixture: ComponentFixture<InputGrdpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputGrdpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputGrdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
