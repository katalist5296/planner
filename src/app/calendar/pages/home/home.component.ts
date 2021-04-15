import { Component, OnInit } from '@angular/core';
import {finalize} from 'rxjs/operators';
import {EventsService} from '../../../core/services/events.service';
import {CalendarService} from '../../services/calendar.service';
import {Day} from '../../domain/day.domain';
import {EventsApi} from '../../../core/api/events.api';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  events = [];
  tabs = ['Редактировать', 'Очистить'];
  day: Day;

  constructor(
    private calendarService: CalendarService,
    private eventsService: EventsService,
    private router: Router,
    private eventsApi: EventsApi
  ) { }

  ngOnInit(): void {
    this.day = this.calendarService.getCurrentDay();
  }

  onDayClicked($event): void {
    this.day = $event;
    this.loadEvents(this.day.number, this.day.monthIndex + 1, this.day.year);
  }

  onTabSelect($event): void {
    switch ($event) {
      case 'Редактировать':
        this.router.navigate(['/calendar', this.calendarService.generateDayId(this.day.number, this.day.monthIndex + 1, this.day.year)]);
        break;
    }
  }

  loadEvents(day: number, month: number, year: number): void {
    this.eventsApi
      .getById(`${day}${month}${year}`)
      .subscribe((data) => {
        this.events = data;
      });
  }

}
