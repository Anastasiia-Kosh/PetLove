import { apiInstance } from "./api";
import type { CurrentFullResponse, CurrentResponse, User } from "@/types/user";
import type { NewsResponse } from "@/types/news";
import type { Friend } from "@/types/friends";
import type { NoticesResponce,  NoticeDetails } from "@/types/notice";
import type { City } from "@/types/city";
import type { Pet } from "@/types/pet";

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}
export const registerUser = async (registerData: RegisterRequest) => {
  const { data } = await apiInstance.post<User>(`/users/signup`, registerData);
  return data;
};
export interface LoginRequest {
  email: string;
  password: string;
}
export const loginUser = async (loginData: LoginRequest) => {
  const { data } = await apiInstance.post<User>(`/users/signin`, loginData);
  return data;
};

export const currentUserInfo = async () => {
  const { data } = await apiInstance.get<CurrentResponse>(`/users/current`);
  return data;
};

export const currentUserFullInfo = async (token: string) => {
  const { data } = await apiInstance.get<CurrentFullResponse>(
    "/users/current/full",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export interface ServerSession {
  message: string;
}
export const logoutUser = async () => {
  const { data } = await apiInstance.post<ServerSession>(`/users/signout`);
  return data;
};

interface GetNewsParams {
  keyword?: string;
  page?: number;
  limit?: number;
}

export const getNews = async ({
  keyword = "",
  page = 1,
  limit = 6,
}: GetNewsParams = {}) => {
  const { data } = await apiInstance.get<NewsResponse>("/news", {
    params: {
      keyword,
      page,
      limit,
    },
  });

  return data;
};

export const getFriends = async () => {
  const { data } = await apiInstance.get<Friend[]>("/friends");
  return data;
};

interface GetNoticesParams {
  keyword?: string;
  category?: string;
  species?: string;
  locationId?: string;
  byDate?: boolean;
  byPrice?: boolean;
  byPopularity?: boolean;
  sex?: string;
  page?: number;
  limit?: number;
}

export const getNotices = async ({
  keyword = "",
  category,
  species,
  locationId = "",
  byDate,
  byPrice,
  byPopularity,
  sex,
  page = 1,
  limit = 6,
}: GetNoticesParams = {}) => {
  const { data } = await apiInstance.get<NoticesResponce>("/notices", {
    params: {
      keyword,
      category,
      species,
      locationId,
      byDate,
      byPrice,
      byPopularity,
      sex,
      page,
      limit,
    },
  });

  return data;
};

export const getNoticeCategories = async () => {
  const { data } = await apiInstance.get<string[]>("/notices/categories");

  return data;
};

export const getNoticeSex = async () => {
  const { data } = await apiInstance.get<string[]>("/notices/sex");

  return data;
};

export const getNoticeSpecies = async () => {
  const { data } = await apiInstance.get<string[]>("/notices/species");

  return data;
};
export const getCities = async (keyword: string) => {
  const { data } = await apiInstance.get<City[]>("/cities", {
    params: { keyword },
  });

  return data;
};
export const getCitiesLocations = async () => {
  const { data } = await apiInstance.get<City[]>("/cities/locations");

  return data;
};
export const getNoticeById = async (id: string) => {
  const { data } = await apiInstance.get<NoticeDetails>(
    `/notices/${id}`,
  );

  return data;
};

export const addNoticeToFavorites = async (id: string) => {
  const { data } = await apiInstance.post<string[]>(
    `/notices/favorites/add/${id}`,
  );

  return data;
};

export const removeNoticeFromFavorites = async (id: string) => {
  const { data } = await apiInstance.delete<string[]>(
    `/notices/favorites/remove/${id}`,
  );

  return data;
};

export interface AddPetRequest {
  name: string;
  title: string;
  imgURL: string;
  species: string;
  birthday: string;
  sex: string;
}
export const addPet = async (petData: AddPetRequest) => {
  const { data } = await apiInstance.post<Pet>(
    "/users/current/pets/add",
    petData,
  );

  return data;
};

export const removePet = async (petId: string) => {
  const { data } = await apiInstance.delete(
    `/users/current/pets/remove/${petId}`,
  );

  return data;
};