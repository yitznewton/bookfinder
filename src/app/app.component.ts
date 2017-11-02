import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  books: BookSummary[] = [];

  private subscription: Subscription = new Subscription();

  constructor (private http: HttpClient) {}

  updateQ(event): void {
    this.subscription.unsubscribe();

    this.subscription = this.http.get('/books', {params: {q: event.target['value']}}).subscribe(books => {
      this.books = books['results'].map(b => new BookSummary(b));
    });
  }
}

class BookSummary {
  readonly id;
  readonly title;
  readonly author;
  readonly img_src;
  readonly stars: Number;
  readonly ratings_count: Number;

  constructor (raw_book) {
    this.id = raw_book['best_book']['id'];
    this.title = raw_book['best_book']['title'];
    this.author = raw_book['best_book']['author']['name'];
    this.img_src = raw_book['best_book']['image_url'];
    this.stars = Number.parseFloat(raw_book['average_rating']);
    this.ratings_count = Number.parseFloat(raw_book['ratings_count']);
  }
}
