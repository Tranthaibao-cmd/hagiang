import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigUserGroupTableComponent } from './config-user-group-table.component';

describe('ConfigUserGroupTableComponent', () => {
  let component: ConfigUserGroupTableComponent;
  let fixture: ComponentFixture<ConfigUserGroupTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigUserGroupTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigUserGroupTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
