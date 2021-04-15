import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {Event} from '../domain/event.domain';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventsApi {
  constructor(private http: HttpClient) { }

  getById(id: string): Observable<any> {
    return this.http.get<Event>(`http://localhost:3000/events?date=${id}`)
      .pipe(
        map((response: any) => response),
        catchError((err, caught) => EMPTY)
      );
  }

  add(event: Event): Observable<any> {
    return this.http.post(`http://localhost:3000/events`, event)
      .pipe(
        map((response: any) => response),
        catchError((err, caught) => EMPTY)
      );
  }

  update(event: Event): Observable<any> {
    return this.http.put(`http://localhost:3000/events`, event)
      .pipe(
        map((response: any) => response),
        catchError((err, caught) => EMPTY)
      );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/events/${id}`)
      .pipe(
        map((response: any) => response),
        catchError((err, caught) => EMPTY)
      );
  }
}
