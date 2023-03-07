import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CheckBoxSelectionService,
  MultiSelectModule,
} from '@syncfusion/ej2-angular-dropdowns';
import { ConfigIndicatorMeasureFormComponent } from './config-indicator-measure-form.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';
import { TagifyComponent, TagifyModule } from 'ngx-tagify';
import { KatexModule } from 'ng-katex';
import { IndicatorMeasureService } from '@features/service/indicator-measure/indicator-measure.service';
import { MaChiTieuValidatorDirective } from './ma-chi-tieu-validator.directive';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

@NgModule({
  declarations: [
    ConfigIndicatorMeasureFormComponent,
    MaChiTieuValidatorDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TextFieldModule,
    TagifyModule,
    KatexModule,
    MultiSelectModule,
    DropDownListModule
  ],
  providers: [IndicatorMeasureService, CheckBoxSelectionService],
  exports: [ConfigIndicatorMeasureFormComponent],
})
export class ConfigIndicatorMeasureFormModule {}
