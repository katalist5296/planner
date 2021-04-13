import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../domain/user.domain';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();

    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  login(username: string, password: string) {
    return this.http.get<User>(`http://localhost:3000/accounts?username=${username}&password=${password}`)
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/auth/sign-in']);
  }

  register(user: User) {
    return this.http.post(`http://localhost:3000/accounts`, user);
  }

  isLogged(): boolean {
    return !!this.userSubject.value;
  }
}
