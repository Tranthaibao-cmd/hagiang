import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FiveyearPlanRoutingModule } from './fiveyear-plan-routing.module';
import { FiveyearPlanComponent } from './fiveyear-plan.component';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { FiveyearPlanTableModule } from '@features/table/fiveyear-plan-table/fiveyear-plan-table.module';


@NgModule({
  declarations: [
    FiveyearPlanComponent
  ],
  imports: [
    CommonModule,
    FiveyearPlanRoutingModule,
    DropDownListModule,
    FiveyearPlanTableModule,
  ]
})
export class FiveyearPlanModule { }
