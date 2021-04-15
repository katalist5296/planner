import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CoreModule} from '../core/core.module';
import {HomeComponent} from './pages/home/home.component';
import {CalendarLayoutComponent} from './layout/calendar-layout.component';
import {EditComponent} from './pages/edit/edit.component';

export const CalendarRoutes: Routes = [
  {
    path: '',
    component: CalendarLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: ':id',
        component: EditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(CalendarRoutes), CoreModule],
  exports: [RouterModule]
})
export class CalendarRoutingModule {}
