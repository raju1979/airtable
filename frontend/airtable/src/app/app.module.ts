import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {CardModule} from 'primeng/card';
import { ApiService } from './services/api.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AuthGuard } from './services/auth.guard';
import { JwtInterceptor } from './services/http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardModule,
    HttpClientModule,
    ButtonModule,
    RippleModule
  ],
  providers: [
    ApiService, 
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
