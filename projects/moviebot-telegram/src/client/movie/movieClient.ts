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

export interface MovieClient {
  getMovie: (queryString: string) => Promise<Movie>;
  getMovieWithYear: (queryString: string, year: string) => Promise<Movie>;
  getMovieWithID: (id: string) => Promise<Movie>;
}
