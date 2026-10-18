import type { NoticeFavorites, NoticeViewed } from "./notice";
import type { Pet } from "./pet";

export interface User {
  email: string;
  name: string;
  token: string;
}
export type AuthUser = CurrentFullResponse;

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
