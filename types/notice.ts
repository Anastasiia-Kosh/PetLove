export interface NoticeItem {
  _id: string;
  species: string;
  category: string;
  price: number;
  title: string;
  name: string;
  birthday: string | null;
  comment: string;
  sex: string;
  location: string;
  imgURL: string;
  popularity: number;
  user: string;
  createdAt: string;
  updatedAt: string;
}
export interface NoticesResponce {
  results: NoticeItem[];
  totalPages: number;
  page: number;
  perPage: number;
}

export interface NoticeFavorites {
  _id: string;
  species: string;
  category: string;
  title: string;
  name: string;
  birthday: string;
  comment: string;
  sex: string;
  location: string;
  imgURL: string;
  createdAt: string;
  user: string;
  popularity: number;
  updatedAt: string;
}
export interface NoticeViewed {
  _id: string;
  species: string;
  category: string;
  price: number;
  title: string;
  name: string;
  birthday: string;
  comment: string;
  sex: string;
  location: string;
  imgURL: string;
  createdAt: string;
  user: string;
  popularity: number;
  updatedAt: string;
}
