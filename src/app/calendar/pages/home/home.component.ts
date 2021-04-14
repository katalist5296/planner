import { Component, OnInit } from '@angular/core';
import {finalize} from 'rxjs/operators';
import {EventsService} from '../../../core/services/events.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  events = [];

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.eventsService
      .list(13, 4, 2021)
      .subscribe((data) => {
        this.events = data;
      });
  }

}
