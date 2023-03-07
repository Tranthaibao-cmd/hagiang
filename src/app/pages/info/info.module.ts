import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfoRoutingModule } from './info-routing.module';
import { InfoComponent } from './info.component';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { AlertModule } from '@shared/alert/alert.module';

@NgModule({
  declarations: [InfoComponent],
  imports: [
    CommonModule,
    InfoRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule,
    AlertModule,
  ],
  exports: [],
})
export class InfoModule {}
