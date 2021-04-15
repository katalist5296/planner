import {Time} from '@angular/common';

export enum EventAction {
  NONE,
  ADD,
  UPDATE,
  DELETE
}

export class Event {
  id: number;
  date: string;
  userId: number;
  time: Time;
  text: string;
  action: EventAction;
}
