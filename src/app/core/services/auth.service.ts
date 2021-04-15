import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../domain/user.domain';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {UsersApi} from "../api/users.api";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private usersApi: UsersApi
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();

    this.logout();
  }

  login(username: string, password: string) {
    return this.usersApi.login(username, password).pipe(map(user => {
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
      return user;
    }));
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  register(user: User) {
    return this.usersApi.register(user);
  }

  getId(): number {
    return this.userSubject.value[0].id;
  }

  isLogged(): boolean {
    return !!this.userSubject.value;
  }
}
