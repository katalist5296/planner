import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {EMPTY, Observable} from 'rxjs';
import {Event} from '../domain/event.domain';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) {}

  list(day: number, month: number, year: number): Observable<Array<any>> {
    return this.http.get<Event>(`http://localhost:3000/events?date=${day}${month}${year}`)
      .pipe(
        map((response: any) => response),
        catchError((err, caught) => EMPTY)
      );
  }
}
