export interface NewsItem {
  _id: string;
  imgUrl: string;
  title: string;
  text: string;
  date: string;
  url: string;
}
export interface NewsResponse {
  results: NewsItem[];
  totalPages: number;
  page: number;
  perPage: number;
}
