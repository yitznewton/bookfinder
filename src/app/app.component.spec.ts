import { AppComponent } from './app.component';
import { BookSearchService } from './book-search-service';
import { Observable } from 'rxjs/Observable';
import { BookSummary } from './book-summary';
import * as _ from 'lodash';
import * as faker from 'faker';
import { Subject } from 'rxjs/Subject';

class StubBookSearchService extends BookSearchService {
  private subject: Subject<BookSummary[]> = new Subject();

  public next(value: BookSummary[]) {
    this.subject.next(value);
  }

  public get(q: string, page: number): Observable<BookSummary[]> {
    return this.subject;
  }
}

const fakeResultsPage = (): BookSummary[] => {
  return _.range(10).map(i => {
    return {
      id: i + 1,
      title: faker.company.bs(),
      author: faker.name.firstName() + ' ' + faker.name.lastName(),
      img_src: faker.image.imageUrl(),
      stars: faker.random.number(5),
      ratings_count: faker.random.number(10000)
    };
  });
};

let component,
  _component,
  bookSearchService;

describe('AppComponent', () => {
  beforeEach(() => {
    bookSearchService = new StubBookSearchService();
    spyOn(bookSearchService, 'get').and.callThrough();

    _component = null;

    component = () => {
      if (_component) { return _component; }

      _component = new AppComponent(bookSearchService);
      _component.ngOnInit();

      return _component;
    };
  });

  describe('infinite scrolling', () => {
    it('does not request while waiting on response', () => {
      component().updateQ({target: {value: 'xyz'}});
      component().onScroll();
      bookSearchService.next(fakeResultsPage());

      component().onScroll();
      component().onScroll();
      bookSearchService.next(fakeResultsPage());

      expect(bookSearchService.get).toHaveBeenCalledTimes(2);
    });

    it('stops requesting when the end of results is reached', () => {
      component().updateQ({target: {value: 'xyz'}});
      bookSearchService.next(fakeResultsPage());

      component().onScroll();
      bookSearchService.next(fakeResultsPage());

      component().onScroll();
      bookSearchService.next([]);

      component().onScroll();

      expect(bookSearchService.get).toHaveBeenCalledTimes(3);
    });
  });
});
