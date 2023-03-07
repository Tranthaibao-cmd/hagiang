import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticalGridComponent } from './statistical-grid.component';

describe('StatisticalGridComponent', () => {
  let component: StatisticalGridComponent;
  let fixture: ComponentFixture<StatisticalGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticalGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticalGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
