import {NgModule} from '@angular/core';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {AuthRoutingModule} from './auth-routing.module';
import {CoreModule} from '../core/core.module';

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    CoreModule,
    AuthRoutingModule
  ]
})
export class AuthModule {}
