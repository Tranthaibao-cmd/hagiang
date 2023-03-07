import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { AuthenticationService } from '@features/service/authentication-service/authentication.service';
import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { appInitializer } from './interceptor/app.initializer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MathJaxModule } from 'ngx-mathjax';
import { KatexModule } from 'ng-katex';
import { NotifyService } from '@shared/notify-service/notify.service';
import localeGB from '@angular/common/locales/vi';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeGB);

@NgModule({
  declarations: [AppComponent,],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    NgHttpLoaderModule.forRoot(),
    KatexModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'vi'},
    NotifyService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthenticationService],
    },

    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
