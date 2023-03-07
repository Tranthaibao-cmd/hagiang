import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { PredictComponent } from './predict.component';
import { PredictRoutingModule } from './predict-routing.module';
import { PredictTableModule } from '@features/table/predict-table/predict-table.module';
import { PredictChartModule } from '@features/predict-chart/predict-chart.module';

@NgModule({
  declarations: [PredictComponent],
  imports: [
    CommonModule,
    PredictTableModule,
    PredictRoutingModule,
    PredictChartModule,
    DropDownListModule,
  ],
  providers: [],
})
export class PredictModule {}
