import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistrationComponent} from './registration/registration.component'
import {ViewempComponent} from './viewemp/viewemp.component'

const routes: Routes = [
  { path:  '', component:  RegistrationComponent},
  { path:  'addNewEmployee', component:  RegistrationComponent},
  { path:  'viewEmploye', component:  ViewempComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
