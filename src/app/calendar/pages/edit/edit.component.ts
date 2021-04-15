import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {forkJoin, Subscription} from 'rxjs';
import {EventsApi} from '../../../core/api/events.api';
import {Event, EventAction} from '../../../core/domain/event.domain';
import {AuthService} from '../../../core/services/auth.service';
import {Day} from '../../domain/day.domain';
import {CalendarService} from '../../services/calendar.service';
import {DayStoreService} from '../../services/day-store.service';
import {HomeComponent} from "../home/home.component";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss', '../home/home.component.scss']
})
export class EditComponent implements OnInit {
  id: number;
  tabs = ['Сохранить', 'Назад'];
  events = [];
  eventsEdit = [];
  currentEvent: Event;
  isCreate: boolean;
  day: Day;
  private subscription: Subscription;

  constructor(
    private dayStore: DayStoreService,
    private eventsApi: EventsApi,
    private router: Router,
    private authService: AuthService,
    private activateRoute: ActivatedRoute,
    private calendarService: CalendarService
  ){
    this.subscription = this.activateRoute.params.subscribe(params => this.id = params.id);
  }

  ngOnInit(): void {
    if (!this.dayStore.getSelectDay()) {
      this.router.navigate(['/calendar']);
      return;
    }

    const {day, monthIndex, year} = this.dayStore.getSelectDay();
    this.day = this.calendarService.createDay(day, monthIndex, year);

    this.eventsApi
      .getById(`${this.id}`)
      .subscribe((data) => {
        this.events = data;
      });
  }

  handleCreateEvent(): void {
    this.currentEvent = new Event();
    this.isCreate = true;
  }

  onClickEvent($event): void {
    this.currentEvent = $event;
  }

  generateHttpEvent() {
    return this.events.map(event => {
      switch (event.action) {
        case EventAction.ADD:
          event.action = EventAction.NONE;
          return this.eventsApi.add(event).subscribe();
        case EventAction.UPDATE:
          event.action = EventAction.NONE;
          return this.eventsApi.update(event).subscribe();
        case EventAction.DELETE:
          return this.eventsApi.delete(event.id).subscribe();
      }
    });
  }

  onTabSelect($event): void {
    switch ($event) {
      case 'Сохранить':
        console.log([this.generateHttpEvent()]);
        forkJoin([this.generateHttpEvent()]).subscribe(results => {
          this.router.navigate(['/calendar']);

          // TODO: костыль, надо почитать как сделать по умному
          setTimeout(() => {
            HomeComponent.returned.next(true);
          }, 200);
        });
        break;
      case 'Назад':
        this.router.navigate(['/calendar']);
        break;
    }
  }

  onDetailCancel(): void {
    delete this.currentEvent;
  }

  onDetailDelete($event): void {
    console.log($event);
    const event = this.events.find(e => e.id === $event);
    event.action = EventAction.DELETE;
    delete this.currentEvent;
  }

  onDetailUpdate($event): void {
    let event = this.events.find(e => e.id === $event.id);
    event = $event;
    event.action = EventAction.UPDATE;
    delete this.currentEvent;
  }

  onDetailAdd($event): void {
    $event.userId = this.authService.getId();
    $event.action = EventAction.ADD;
    console.log($event)
    this.events.push($event);
    this.isCreate = false;
    delete this.currentEvent;
  }

}
