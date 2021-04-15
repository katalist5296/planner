import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Day} from '../../domain/day.domain';
import {EventsApi} from '../../../core/api/events.api';
import {Event} from '../../../core/domain/event.domain';

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
  day: Day;
  private subscription: Subscription;

  constructor(
    private eventsApi: EventsApi,
    private router: Router,
    private activateRoute: ActivatedRoute
  ){
    this.subscription = activateRoute.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit(): void {
    this.eventsApi
      .getById(`${this.id}`)
      .subscribe((data) => {
        this.events = data;
        console.log(this.events);
      });
  }

  onClickEvent($event): void {
    this.currentEvent = $event;
  }

  onTabSelect($event): void {
    switch ($event) {
      case 'Сохранить':
        break;
    }

    this.router.navigate(['/calendar']);
  }

}
