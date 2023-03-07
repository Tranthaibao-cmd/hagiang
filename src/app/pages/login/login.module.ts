import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginFormModule } from '@features/form/login-form/login-form.module';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, LoginFormModule, LoginRoutingModule],
  providers: [],
})
export class LoginModule {}
