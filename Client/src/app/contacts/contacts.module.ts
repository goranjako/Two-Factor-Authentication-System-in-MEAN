import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { VerifyContactComponent } from './verify-contact/verify-contact.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


@NgModule({
  declarations: [
    ContactsComponent,
    AddContactComponent,
    VerifyContactComponent,
    EditContactComponent
  ],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    FormsModule, ReactiveFormsModule, HttpClientModule,
    AppRoutingModule,
    NgxSpinnerModule.forRoot(),
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    SweetAlert2Module.forRoot()
  ]
})
export class ContactsModule { }
