import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputDataTableModule } from '@features/table/input-data-table/input-data-table.module';
import { InputDataRoutingModule } from './input-data-routing.module';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

import { InputDataComponent } from './input-data.component';

@NgModule({
  declarations: [InputDataComponent],
  imports: [
    CommonModule,
    InputDataTableModule,
    InputDataRoutingModule,
    DropDownListModule,
    ButtonModule
  ],
  providers: [],
})
export class InputDataModule {}
