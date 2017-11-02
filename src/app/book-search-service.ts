import { BookSummary, ApiBookSummary } from './book-summary';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

export abstract class BookSearchService {
  public abstract get(q: string, page: number): Observable<BookSummary[]>;
}

@Injectable()
export class ApiBookSearchService extends BookSearchService {
  constructor (private http: HttpClient) { super(); }

  public get(q: string, page: number): Observable<BookSummary[]> {
    return this.http.get('/books', {
      params: {
        q: q,
        page: page.toString()
      }
    }).map(response => this.wrap(response));
  }

  private wrap(response) {
    return response.results.map(b => new ApiBookSummary(b));
  }
}
