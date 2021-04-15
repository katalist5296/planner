import {NgModule} from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import {CoreModule} from '../core/core.module';
import {CalendarRoutingModule} from './calendar-routing.module';
import { CalendarLayoutComponent } from './layout/calendar-layout.component';
import {CommonModule} from '@angular/common';
import { CalendarComponent } from './components/calendar/calendar.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { BottombarComponent } from './components/bottombar/bottombar.component';
import { EditComponent } from './pages/edit/edit.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';

@NgModule({
  declarations: [
    HomeComponent,
    CalendarLayoutComponent,
    CalendarComponent,
    EventListComponent,
    BottombarComponent,
    EditComponent,
    EventDetailComponent,
  ],
  imports: [
    CoreModule,
    CalendarRoutingModule,
    CommonModule
  ]
})
export class CalendarModule {}
