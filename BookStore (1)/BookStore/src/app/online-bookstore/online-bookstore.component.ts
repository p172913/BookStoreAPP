import { ActivatedRoute, RouteConfigLoadStart, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { OnInit, Component, ChangeDetectionStrategy } from '@angular/core';
import { BookstoreService } from '../bookstore.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-online-bookstore',
  templateUrl: './online-bookstore.component.html',
  styleUrls: ['./online-bookstore.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnlineBookstoreComponent implements OnInit {

  books$: Observable<any>;
  text: any;
  constructor(private route: ActivatedRoute, private router: Router, private bookstoreService: BookstoreService,
      private loginservice: AuthService) { }

  ngOnInit() {
    this.loginservice.isCust.next(true);
    this.bookstoreService.getBooks();
    this.books$ =  this.bookstoreService.books$.asObservable();
  }

  deleteBook(book) {

    this.bookstoreService.deleteBook(book.id);
    this.bookstoreService.getBooks();
    this.books$ =  this.bookstoreService.books$.asObservable();
  }
  navigateTo(id): void {
this.router.navigate([`bookstore`, id]); }

}


