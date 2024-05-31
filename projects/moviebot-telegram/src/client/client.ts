import { Movie } from "../fetcher/movie/movieFetcher";

export const splitter = (queryString: string): string[] =>
  queryString.split(" ");
export const joiner = (splitString: string[]): string =>
  splitString.join("%20");

export interface Client {
  getMovie: (queryString: string) => Promise<Movie>;
  getMovieWithYear: (queryString: string, year: string) => Promise<Movie>;
  //   getMovieWithID: () => Movie;
}

export type Fetch = typeof fetch;
