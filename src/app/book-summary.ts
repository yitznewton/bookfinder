export interface BookSummary {
  id: string;
  title: string;
  author: string;
  img_src: string;
  stars: Number;
  ratings_count: Number;
}

export class ApiBookSummary implements BookSummary {
  readonly id: string;
  readonly title: string;
  readonly author: string;
  readonly img_src: string;
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
