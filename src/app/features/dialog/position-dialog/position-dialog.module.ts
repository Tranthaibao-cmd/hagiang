import { NgModule } from '@angular/core';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { CommonModule } from '@angular/common';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
// import { TooltipModule } from '@syncfusion/ej2-angular-popups';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { PositionDialogComponent } from './position-dialog.component';

@NgModule({
  declarations: [PositionDialogComponent],
  imports: [
    CommonModule,
    DialogModule,
    RadioButtonModule,
    TabModule,
    CheckBoxModule,
  ],
  exports: [PositionDialogComponent],
})
export class PositionDialogModule {}
