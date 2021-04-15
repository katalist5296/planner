import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {User} from '../domain/user.domain';
import {EMPTY} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersApi {
  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.get<User>(`http://localhost:3000/accounts?username=${username}&password=${password}`)
      .pipe(
        map((response: any) => response),
        catchError((err, caught) => EMPTY)
      );
  }

  register(user: User) {
    return this.http.post(`http://localhost:3000/accounts`, user)
      .pipe(
        map((response: any) => response),
        catchError((err, caught) => EMPTY)
      );
  }
}
