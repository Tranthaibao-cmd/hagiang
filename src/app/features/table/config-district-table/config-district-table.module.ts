import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import {
  PageService,
  EditService,
  SortService,
  ToolbarService,
  FilterService,
} from '@syncfusion/ej2-angular-grids';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { AlertModule } from '@shared/alert/alert.module';
import { ConfigDistrictTableRoutingModule } from './config-district-routing.module';
import { ConfigDistrictTableComponent } from './config-district-table.component';

@NgModule({
  declarations: [ConfigDistrictTableComponent],
  imports: [CommonModule, GridModule, DialogModule, ConfigDistrictTableRoutingModule, AlertModule],
  providers: [
    PageService,
    SortService,
    ToolbarService,
    EditService,
    FilterService
  ],
  exports: [ConfigDistrictTableComponent],
})
export class ConfigDistrictTableModule {}
