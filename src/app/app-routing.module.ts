import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [{ path: '',
redirectTo: 'login',
pathMatch: 'full' },
{
  path: 'signup',
  component: SignupComponent
},
{
  path:'login',
  component: LoginComponent
},
{
  path:"dashboard",
  component: DashboardComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
