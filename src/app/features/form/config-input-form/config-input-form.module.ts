import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigInputFormComponent } from './config-input-form.component';

@NgModule({
    declarations: [ConfigInputFormComponent],
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    exports: [ConfigInputFormComponent]
})
export class ConfigInputFormModule{}