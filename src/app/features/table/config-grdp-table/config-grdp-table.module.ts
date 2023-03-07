import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import {
  PageService,
  EditService,
  SortService,
  ToolbarService,
  FilterService,
} from '@syncfusion/ej2-angular-treegrid';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { ConfigGRDPTableRoutingModule } from './config-grdp-routing.module';
import { ConfigGrdpTableComponent } from './config-grdp-table.component';
import { AlertModule } from '@shared/alert/alert.module';

@NgModule({
  declarations: [ConfigGrdpTableComponent],
  imports: [CommonModule, TreeGridModule, DialogModule, ConfigGRDPTableRoutingModule, AlertModule],
  providers: [
    PageService,
    SortService,
    ToolbarService,
    EditService,
    FilterService
  ],
  exports: [ConfigGrdpTableComponent],
})
export class ConfigGRDPTableModule {}
