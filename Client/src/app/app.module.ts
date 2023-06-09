
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Interceptor } from './shared/interceptor.interceptor';
import { NotFoundComponent } from './index/not-found/not-found.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { VerifyComponent } from './auth/verify/verify.component';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    RegisterComponent,
    LoginComponent,
    VerifyComponent
  ],
  imports: [
    BrowserModule, RouterModule,
    FormsModule, ReactiveFormsModule, HttpClientModule,
    AppRoutingModule,
    NgxSpinnerModule.forRoot(),
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
