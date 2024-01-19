const API_ROOT_URL = "https://gengo.onrender.com/";
//"http://localhost:8080/";
// https://gengo.onrender.com/

//flashcard
export const FLASHCARD_BY_ID_URL = (id: number | string) => `${API_ROOT_URL}api/v1/flashcard/${id}`;
export const FLASHCARD_CREATE_URL = `${API_ROOT_URL}api/v1/flashcard`;

//deck
export const DECK_BY_ID_URL = (id: number | string) => `${API_ROOT_URL}api/v1/deck/${id}`;
export const DECK_CREATE_URL = `${API_ROOT_URL}api/v1/deck`;
export const DECK_WITH_CATEGOY_URL = (id: number | string, query: string) =>
  `${API_ROOT_URL}api/v1/deck/category/${id}/?${query}`;
export const ALL_DECK_URL = (query: string) => `${API_ROOT_URL}api/v1/deck/?${query}`;
export const DECK_WITH_DATE_CATEGOY_URL = (id: number | string, query: string) =>
  `${API_ROOT_URL}api/v1/deck/date/category/${id}/?${query}`;
export const ALL_DECK_DATES_URL = (query: string) => `${API_ROOT_URL}api/v1/deck/date/?${query}`;

//category
export const CATEGORY_URL = `${API_ROOT_URL}api/v1/category`;
export const CATEGORY_ID_URL = (id: number | string) => `${API_ROOT_URL}api/v1/category/${id}`;

//user
export const CREATE_USER_API = `${API_ROOT_URL}api/v1/user/signup`;
export const UPDATE_GET_USER_API = `${API_ROOT_URL}api/v1/user/account`;
export const GET_ALL_USERS_API = `${API_ROOT_URL}api/v1/user`;
export const LOGIN_USER_API = `${API_ROOT_URL}api/v1/user/login`;

//sticker
export const ALL_STICKER_API = `${API_ROOT_URL}api/v1/sticker`;
export const STICKER_BY_ID = (id: number | string) => `${API_ROOT_URL}api/v1/sticker/${id}`;
