import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigUserGroupFormComponent } from './config-user-group-form.component';

@NgModule({
  declarations: [ConfigUserGroupFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [],
  exports: [ConfigUserGroupFormComponent],
})
export class ConfigUserGroupFormModule {}
