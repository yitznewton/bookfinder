export class BookSummary {
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
