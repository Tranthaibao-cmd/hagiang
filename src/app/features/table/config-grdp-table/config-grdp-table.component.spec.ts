import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigGrdpTableComponent } from './config-grdp-table.component';

describe('ConfigGrdpTableComponent', () => {
  let component: ConfigGrdpTableComponent;
  let fixture: ComponentFixture<ConfigGrdpTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigGrdpTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigGrdpTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
