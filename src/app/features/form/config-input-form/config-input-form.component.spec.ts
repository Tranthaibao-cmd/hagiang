import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigInputFormComponent } from './config-input-form.component';

describe('ConfigInputFormComponent', () => {
  let component: ConfigInputFormComponent;
  let fixture: ComponentFixture<ConfigInputFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigInputFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
