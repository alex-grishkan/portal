import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProfileComponent } from './profile/profile.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResultListComponent } from './result-list/result-list.component';
import { ResultViewComponent } from './result-view/result-view.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'results', component: ResultListComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'result/:id', component: ResultViewComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: '**', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
