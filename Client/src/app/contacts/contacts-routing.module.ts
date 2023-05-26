import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { VerifyComponent } from '../auth/verify/verify.component';

const routes: Routes = [
  { path: '', component: ContactsComponent },
  {path:"add",component:AddContactComponent},
  {path:"verify",component: VerifyComponent},
 {path:"edit",component:EditContactComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
