import { fetcher } from "../fetcher";

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

export const getMovie = async (queryString: string): Promise<Movie> => {
  const splitQuery = queryString.split(" ");
  const urlQueryString = splitQuery.join("%20");
  return fetcher(
    `http://www.omdbapi.com/?t=${urlQueryString}&apikey=${process.env.MOVIE_DATABASE_KEY}`
  ).catch(() => ({ Response: "False" } as Movie));
};

export const getMovieWithYear = async (
  queryString: string,
  year: string
): Promise<Movie> => {
  const splitQuery = queryString.split(" ");
  const urlQueryString = splitQuery.join("%20");

  return fetcher(
    `http://www.omdbapi.com/?t=${urlQueryString}&y=${year}&apikey=${process.env.MOVIE_DATABASE_KEY}`
  ).catch(() => ({ Response: "False" } as Movie));
};

export const getMovieWithID = async (queryString: string): Promise<Movie> => {
  const splitQuery = queryString.split(" ");
  const urlQueryString = splitQuery.join("%20");

  return fetcher(
    `http://www.omdbapi.com/?i=${urlQueryString}&apikey=${process.env.MOVIE_DATABASE_KEY}`
  ).catch(() => ({ Response: "False" } as Movie));
};
