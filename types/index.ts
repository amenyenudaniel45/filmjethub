import { Dispatch, SetStateAction } from "react";
export interface trendingMoviesProps {
  id: number;
  poster_path: string;
}

export interface AccordionItemProps {
  title: string;
  content: string;
}

export interface AuthContextProps {
  auth: any;
  email: string;
  password: string;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  handleLogIn: () => Promise<void>;
  handleSignUp: () => Promise<void>;
  handleSignOut?: () => Promise<void>;
  googleSignUp?: () => Promise<void>;
}

export interface MovieProps {
  poster_path: string;
  title: string;
  vote_average: number;
  id: number;
  movie: any;
  page?: number;
  name: any;
  original_title?: any;
}

export interface MovieDetailsProps {
  poster_path: string;
  title: string;
  homepage: string;
  overview: string;
  genres: any;
  vote_average: number;
  vote_count: number;
  status: string;
  imdb_id: number;
  release_date: string;
  runtime: number;
  spoken_languages: any;
  production_companies: any;
  production_countries: any;
  tagline: string;
  name?: string;
  first_air_date?: string;
  number_of_seasons?: number;
  number_of_episodes?: number;
}

export interface MovieTrailerProps {
  key: string;
  name: string;
  id: number;
}
