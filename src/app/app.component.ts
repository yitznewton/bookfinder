import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  books: Book[] = [];

  constructor (private http: HttpClient) {}

  updateQ(event: InputEvent) {
    this.http.get('http://localhost:4567/books', {params: {q: event.target['value']}}).subscribe(books => {
      this.books = books['results'].map(b => new Book(b));
    });
  }
}

class Book {
  readonly id;
  readonly title;
  readonly img_src;

  constructor (raw_book) {
    console.info(raw_book);
    this.id = raw_book['best_book']['id'];
    this.title = raw_book['best_book']['title'];
    this.img_src = raw_book['best_book']['small_image_url'];
  }
}
