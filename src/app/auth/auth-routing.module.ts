import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthLayoutComponent} from './layout/auth-layout.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {CoreModule} from '../core/core.module';

export const AuthRoutes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full'
      },
      {
        path: 'sign-in',
        component: SignInComponent
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
      }
    ]
  }
];

@NgModule({
  declarations: [AuthLayoutComponent],
  imports: [RouterModule.forChild(AuthRoutes), CoreModule],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
