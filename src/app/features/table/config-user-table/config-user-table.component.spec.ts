import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigUserTableComponent } from './config-user-table.component';

describe('ConfigUserTableComponent', () => {
  let component: ConfigUserTableComponent;
  let fixture: ComponentFixture<ConfigUserTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigUserTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigUserTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
