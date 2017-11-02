import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { BookSummary } from './book-summary';
import { ApiBookSearchService, BookSearchService } from './book-search-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    {
      provide: BookSearchService,
      useClass: ApiBookSearchService
    }
  ]
})
export class AppComponent implements OnInit {
  books: BookSummary[];

  private q: string;
  private latestPage: number;
  private updating;
  private reachedEnd;

  private subscription: Subscription = new Subscription();

  constructor (private bookSearchService: BookSearchService) {}

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

    this.subscription = this.bookSearchService.get(this.q, this.latestPage).subscribe(books => this.receiveResults(books));
  }

  private receiveResults(newBooks: BookSummary[]): void {
    if (newBooks.length === 0) {
      this.reachedEnd = true;
    }

    this.books = this.books.concat(newBooks);
    this.updating = false;
  }
}
