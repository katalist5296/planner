import { Component, OnInit } from '@angular/core';
import {finalize} from 'rxjs/operators';
import {EventsService} from '../../../core/services/events.service';
import {CalendarService} from '../../services/calendar.service';
import {Day} from '../../domain/day.domain';

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
    private eventsService: EventsService
  ) { }

  ngOnInit(): void {
    this.day = this.calendarService.getCurrentDay();
  }

  onDayClicked($event): void {
    this.day = $event;
    this.loadEvents(this.day.number, this.day.monthIndex + 1, this.day.year);
  }

  onTabSelect($event): void {
    console.log($event)
  }

  loadEvents(day: number, month: number, year: number): void {
    this.eventsService
      .list(day, month, year)
      .subscribe((data) => {
        this.events = data;
      });
  }

}
