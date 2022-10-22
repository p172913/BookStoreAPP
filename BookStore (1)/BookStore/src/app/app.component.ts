import { Component, OnInit } from '@angular/core';
import { BookstoreService } from './bookstore.service';
import { OnlineBookstoreComponent } from './online-bookstore/online-bookstore.component';
import { map } from 'rxjs/operators';
import { Books } from './Model/Books';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  book = '';
  isCust: Observable<boolean>;
  onlineBookStoreComponent: OnlineBookstoreComponent;

  constructor(private bookstoreService: BookstoreService, private auth: AuthService) { }

  ngOnInit(): void {
    this.isCust = this.auth.isCust.asObservable();
  }

  search() {
    this.bookstoreService.setSubject(this.book);
  }
  search2(name: string) {
    console.log('' + name);
    this.bookstoreService.setSubject(' ' + name);

  }

  logout() {
    if (this.auth.isUserLoggedIn()) {
      this.auth.logOut();
      this.isCust = of(false);
    }
  }

}

