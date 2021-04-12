import {NgModule} from '@angular/core';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {AuthRoutingModule} from './auth-routing.module';
import {CoreModule} from '../core/core.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    CoreModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthModule {}
