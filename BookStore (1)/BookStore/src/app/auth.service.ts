import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Customer } from './Model/Customer';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {

isCust = new BehaviorSubject<boolean>(false);
  constructor(private router: Router, private http: HttpClient) { }
  authenticate(username, password) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.get<Customer>('http://localhost:8080/validateLogin', {headers}).pipe(
     map(
       userData => {
        sessionStorage.setItem('username', username);
        return userData;
       }
     )

    );
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem('username');
    user !== null ? this.isCust.next(true) : this.isCust.next(false);
    console.log(!(user === null));
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('username');
    this.isCust.next(false);
    this.router.navigate(['login']);
  }
}

