import { NgModule } from '@angular/core';
import { InputAdminDialogComponent } from './input-admin-dialog.component';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { CommonModule } from '@angular/common';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { TooltipModule } from '@syncfusion/ej2-angular-popups';

@NgModule({
  declarations: [InputAdminDialogComponent],
  imports: [
    CommonModule,
    DialogModule,
    RadioButtonModule,
    TabModule,
    TooltipModule,
  ],
  exports: [InputAdminDialogComponent],
})
export class InputAdminDialogModule {}
