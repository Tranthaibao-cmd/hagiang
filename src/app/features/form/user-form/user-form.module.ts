import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './user-form.component';


@NgModule({
  declarations: [UserFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [],
  exports: [UserFormComponent, FormsModule, ReactiveFormsModule],
})
export class UserFormModule {}
