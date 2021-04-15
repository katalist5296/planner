import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Event} from '../../../core/domain/event.domain';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  @Input()
  events: Event[];

  @Input()
  isClick: boolean;

  @Output()
  onClick = new EventEmitter<Event>();

  constructor() { }

  handleClick(event: Event): void {
    if (!this.isClick) {
      return;
    }

    this.onClick.emit(event);
  }

  ngOnInit(): void {
  }

}
