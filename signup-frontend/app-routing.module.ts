import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './pages/signup/signup.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';


const routes: Routes = [
  { path: '', redirectTo: '/signup-p1', pathMatch: 'full' },
  { path: 'signup-p1', component: SignupComponent },
  { path: 'signup-complete', component: CreateUserComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
