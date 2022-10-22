import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Books } from './Model/Books';
import { Observable } from 'rxjs/Observable';
import { OnlineBookstoreComponent } from './online-bookstore/online-bookstore.component';
import { Subject, BehaviorSubject } from 'rxjs';
import { combineLatest } from 'rxjs/observable/combineLatest';

@Injectable()
export class BookstoreService {

  private data$: Observable<Books[]>;
  private filter = new BehaviorSubject<string>('');
  private filter$ = this.filter.asObservable();

  books$ = new Subject<Books[]>();

  constructor(private http: HttpClient) { }

  addBook(BookData) {
    const username = 'kanishk';
    const password = '123';

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });

    return  this.http.post('http://localhost:8080/addBook', BookData, {headers});
  }

  deleteBook(id) {
    const username = 'kanishk';
    const password = '123';

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });

    this.http.delete('http://localhost:8080/deleteBook?id=' + id, {headers} ).subscribe((res) => console.log(res));
    this.getBooks();

  }

  editBook(book) {
    const username = 'kanishk';
    const password = '123';
    console.log('edited book' + book);
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.put('http://localhost:8080/editBook', book, {headers});
  }

  setSubject(name: string) {
    console.log('Searched string' + name );
    this.filter.next(name);
 console.log('Searched' + this.getBooks());
  }

  getBooks() {
    const username = 'kanishk';
    const password = '123';
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });

   this.data$ = this.http.get<Books[]>('http://localhost:8080/fetchBooks', {headers});
   if (this.filter.getValue() === ' ') {
   this.data$.subscribe((r) => this.books$.next(r));
   return;
  }
  combineLatest([this.data$, this.filter$]).
  pipe(map(([books, name]: [Books[], string]) => books.filter((book) =>  (name  ?
     ((book.name.includes(name)) || (book.description.includes(name)))  : true))))
  .subscribe((r) => this.books$.next(r));
  }
}
