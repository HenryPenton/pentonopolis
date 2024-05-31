export type Rating = { Source: string; Value: string };

export type Movie = {
  Response?: string;
  Title?: string;
  Year?: string;
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Poster?: string;
  imdbID?: string;
  Ratings?: Rating[];
};
export const splitter = (queryString: string): string[] =>
  queryString.split(" ");
export const joiner = (splitString: string[]): string =>
  splitString.join("%20");

export interface Client {
  getMovie: (queryString: string) => Promise<Movie>;
  getMovieWithYear: (queryString: string, year: string) => Promise<Movie>;
  getMovieWithID: (id: string) => Promise<Movie>;
}

export type Fetch = typeof fetch;
