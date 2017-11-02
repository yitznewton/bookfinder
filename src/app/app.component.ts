import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { BookSummary } from './book-summary';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  books: BookSummary[];

  private q: string;
  private latestPage: number;
  private updating;
  private reachedEnd;

  private subscription: Subscription = new Subscription();

  constructor (private http: HttpClient) {}

  ngOnInit(): void {
    this.reset();
  }

  onScroll(): void {
    if (this.updating)   { return; }
    if (this.reachedEnd) { return; }

    this.latestPage++;
    this.updateSubscription();
  }

  updateQ(event): void {
    this.reset();
    this.q = event.target['value'];
    this.updateSubscription();
  }

  private reset() {
    this.books = [];
    this.latestPage = 1;
    this.updating = false;
    this.reachedEnd = false;
  }

  private updateSubscription() {
    this.updating = true;
    this.subscription.unsubscribe();

    this.subscription = this.http.get('/books', {
      params: {
        q: this.q,
        page: this.latestPage.toString()
      }
    }).subscribe(books => this.receiveResults(books));
  }

  private receiveResults(books): void {
    const items = books['results'].map(b => new BookSummary(b));

    if (items.length === 0) {
      this.reachedEnd = true;
    }

    this.books = this.books.concat(items);
    this.updating = false;
  }
}
