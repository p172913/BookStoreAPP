import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookstoreService } from '../bookstore.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css'],
})
export class AddbookComponent implements OnInit {

  book: any = {name: '', description: ' '};
  form: NgForm;
  constructor(private bookStoreService: BookstoreService, private auth: AuthService) { }

  ngOnInit() {
    this.auth.isCust.next(true);
  }

  addBookData(addBookForm: NgForm) {
    this.form = addBookForm;
    this.bookStoreService.addBook(addBookForm.value).subscribe((resp) => console.log(resp));
  }

  clear() {

    this.form.reset();
  }
}
