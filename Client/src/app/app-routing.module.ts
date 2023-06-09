import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { VerifyComponent } from './auth/verify/verify.component';

const routes: Routes = [
{path:"", component:LoginComponent},
{path:"login", component:LoginComponent},
{path:"register", component:RegisterComponent},
{path:"verify", component: VerifyComponent},
{ path: 'contacts', loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule) },
{path:"**",redirectTo:"login", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
