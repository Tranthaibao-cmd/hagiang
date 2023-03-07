import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAdminDialogComponent } from './input-admin-dialog.component';

describe('InputAdminDialogComponent', () => {
  let component: InputAdminDialogComponent;
  let fixture: ComponentFixture<InputAdminDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputAdminDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputAdminDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
