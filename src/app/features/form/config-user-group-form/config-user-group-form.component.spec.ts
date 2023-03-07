import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigUserGroupFormComponent } from './config-user-group-form.component';

describe('ConfigUserGroupFormComponent', () => {
  let component: ConfigUserGroupFormComponent;
  let fixture: ComponentFixture<ConfigUserGroupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigUserGroupFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigUserGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
