import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigResourcesTableComponent } from './config-resources-table.component';

describe('ConfigResourcesTableComponent', () => {
  let component: ConfigResourcesTableComponent;
  let fixture: ComponentFixture<ConfigResourcesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigResourcesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigResourcesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
