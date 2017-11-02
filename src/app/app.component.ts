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
  private q: string;
  private latestPage: number = 1;
  private updating = false;

  constructor (private http: HttpClient) {}

  updateQ(event): void {
    this.q = event.target['value'];
    this.latestPage = 1;
    this.books = [];

    this.updateSubscription();
  }

  private updateSubscription() {
    this.updating = true;
    this.subscription.unsubscribe();

    this.subscription = this.http.get('/books', {
      params: {
        q: this.q,
        page: this.latestPage.toString()
      }
    }).subscribe(books => {
      this.books = this.books.concat(books['results'].map(b => new BookSummary(b)));
      this.updating = false;
    });
  }

  onScroll(): void {
    if (this.updating) { return; }

    this.latestPage++;
    this.updateSubscription();
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
