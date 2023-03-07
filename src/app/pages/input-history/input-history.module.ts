import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputHistoryRoutingModule } from './input-history-routing.module';
import { InputHistoryComponent } from './input-history.component';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import {
  PageService,
  SortService,
  SearchService,
  ToolbarService,
  EditService,
} from '@syncfusion/ej2-angular-grids';

@NgModule({
  declarations: [InputHistoryComponent],
  imports: [CommonModule, InputHistoryRoutingModule, GridModule],
  providers: [
    PageService,
    SortService,
    SearchService,
    ToolbarService,
    EditService,
  ],
})
export class InputHistoryModule {}
