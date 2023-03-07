import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputHistoryComponent } from './input-history.component';

describe('InputHistoryComponent', () => {
  let component: InputHistoryComponent;
  let fixture: ComponentFixture<InputHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
