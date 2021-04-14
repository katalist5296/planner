import {Component, Input, OnInit} from '@angular/core';
import {Event} from "../../../core/domain/event.domain";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  @Input()events: Event[];


  constructor() { }

  ngOnInit(): void {
  }

}
