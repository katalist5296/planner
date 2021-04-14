import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CoreModule} from '../core/core.module';
import {HomeComponent} from './pages/home/home.component';
import {AuthLayoutComponent} from '../auth/layout/auth-layout.component';
import {SignInComponent} from '../auth/sign-in/sign-in.component';
import {SignUpComponent} from '../auth/sign-up/sign-up.component';
import {CalendarLayoutComponent} from './layout/calendar-layout.component';

export const CalendarRoutes: Routes = [
  {
    path: '',
    component: CalendarLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(CalendarRoutes), CoreModule],
  exports: [RouterModule]
})
export class CalendarRoutingModule {}
