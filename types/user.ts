export interface User {
  email: string;
  name: string;
  token: string;
  avatar?: string;
  phone?: string;
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
export interface Pet {
  _id: string;
  name: string;
  title: string;
  imgURL: string;
  species: string;
  birthday: string;
  sex: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}
export interface CurrentResponse {
  _id: string;
  name: string;
  email: string;
  token: string;
  noticesFavorites: NoticeFavorites[];
}

export interface CurrentFullResponse {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  token: string;
  noticesViewed: NoticeViewed[];
  noticesFavorites: NoticeFavorites[];
  pets: Pet[];
  createdAt: string;
  updatedAt: string;
}
