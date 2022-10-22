import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';
import { BookstoreService } from './bookstore.service';
import { OnlineBookstoreComponent } from './online-bookstore/online-bookstore.component';
import { AddbookComponent } from './addbook/addbook.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { AuthGaurdService } from './auth-gaurd.service';
const routes: Routes = [{path: 'bookstore', canActivate:[AuthGaurdService], component: OnlineBookstoreComponent},
{path: 'addbook', component: AddbookComponent}, {path: 'bookstore/:id', component: EditBookComponent},
 { path: 'login', component: LoginComponent }, {path: '', component: LoginComponent}
];
@NgModule({
  declarations: [
    AppComponent, OnlineBookstoreComponent, AddbookComponent, EditBookComponent, LoginComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, RouterModule.forRoot(routes), HttpClientModule
  ],
  providers: [BookstoreService, AuthService, AuthGaurdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
