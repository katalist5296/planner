import {NgModule} from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import {CoreModule} from '../core/core.module';
import {CalendarRoutingModule} from './calendar-routing.module';
import { CalendarLayoutComponent } from './layout/calendar-layout.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    HomeComponent,
    CalendarLayoutComponent
  ],
  imports: [
    CoreModule,
    CalendarRoutingModule,
    CommonModule
  ]
})
export class CalendarModule {}
