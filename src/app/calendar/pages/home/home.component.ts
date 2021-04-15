import {AfterViewInit, Component, OnChanges, OnInit} from '@angular/core';
import {CalendarService} from '../../services/calendar.service';
import {Day} from '../../domain/day.domain';
import {EventsApi} from '../../../core/api/events.api';
import {ActivatedRoute, Router} from '@angular/router';
import {DayStoreService} from '../../services/day-store.service';
import {Subject} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public static returned: Subject<any> = new Subject();

  events = [];
  tabs = ['Редактировать', 'Очистить'];
  day: Day;

  constructor(
    private dayStore: DayStoreService,
    private calendarService: CalendarService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eventsApi: EventsApi
  ) {}

  refresh(): void {
    this.day = this.calendarService.getActualDay();
    this.loadEvents(this.day.number, this.day.monthIndex + 1, this.day.year);
  }

  ngOnInit(): void {
    this.refresh();

    HomeComponent.returned.subscribe(res => {
      console.log('refresh')
      this.refresh();
    });
  }

  onDayClicked($event): void {
    this.day = $event;
    this.loadEvents(this.day.number, this.day.monthIndex + 1, this.day.year);
  }

  onTabSelect($event): void {
    switch ($event) {
      case 'Редактировать':
        this.dayStore.setSelectDay(this.day.number, this.day.monthIndex, this.day.year);
        this.router.navigate(['/calendar', this.calendarService.generateDayId(this.day.number, this.day.monthIndex + 1, this.day.year)]);
        break;

      case 'Очистить':
        this.clearEvents();
        break;
    }
  }

  loadEvents(day: number, month: number, year: number): void {
    this.eventsApi
      .getById(`${this.calendarService.generateDayId(day, month, year)}`)
      .subscribe((data) => {
        this.events = data;
      });
  }

  clearEvents(): void {
    this.events.forEach(event => {
      this.eventsApi
        .delete(event.id)
        .subscribe();
    });

    this.events = [];
  }

}
