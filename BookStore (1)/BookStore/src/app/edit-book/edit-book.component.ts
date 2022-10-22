import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookstoreService } from '../bookstore.service';
import { ActivatedRoute } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { Books } from '../Model/Books';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {


  book: Books = { id: 0, name: '', image: '', price: 0, description: '' };
  constructor(private bookstoreService: BookstoreService, private route: ActivatedRoute, private auth: AuthService) { }

  ngOnInit() {
    this.auth.isCust.next(true);
    this.bookstoreService.getBooks();
    const id = Number(this.route.snapshot.paramMap.get('id'));
   this.bookstoreService.books$.asObservable().pipe(map((books: Books[]) =>
   books.filter((book) => book.id === id))).subscribe((res) => this.book = res[0]);
  }

  editBookData() {
    return this.bookstoreService.editBook(this.book).subscribe((res) => console.log(res));
  }

  clear() {
  }
}
