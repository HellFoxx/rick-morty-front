export interface UserSignUpInfoI {
  nickname: string;
  email: string;
  password: string;
}

export interface UserSignInInfoI {
  email: string;
  password: string;
}

export interface ErrorI {
  status: number;
  message: string;
}

export interface UserInfoI {
  firstName: string | null;
  lastName: string | null;
  nickname: string;
  email: string;
}

export interface UserInfoResponse extends UserInfoI {
  token: string;
}

export interface UserUpdateI {
  firstName: string;
  lastName: string;
}

export interface CharacterI {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface PaginationI<T> {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: T[];
}

export interface LocationI {
  id: number;
  name: string;
  type: string;
  dimension: string;
}

export interface EpisodeI {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}
