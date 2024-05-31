import { Movie } from "../fetcher/movie/movieFetcher";
import { Client, Fetch, splitter, joiner } from "./client";

export class OMDBClient implements Client {
  constructor(private readonly fetch: Fetch) {}
  getMovieWithID = async (id: string): Promise<Movie> => {
    const splitQuery = splitter(id);
    const parsedId = joiner(splitQuery);
    try {
      const response = await this.fetch(
        `http://www.omdbapi.com/?i=${parsedId}&apikey=${process.env.MOVIE_DATABASE_KEY}`
      );

      const movie = (await response.json()) as Movie;

      return movie;
    } catch {
      return { Response: "False" };
    }
  };

  getMovieWithYear = async (title: string, year: string): Promise<Movie> => {
    const splitQuery = splitter(title);
    const parsedTitle = joiner(splitQuery);

    try {
      const response = await this.fetch(
        `http://www.omdbapi.com/?t=${parsedTitle}&y=${year}&apikey=${process.env.MOVIE_DATABASE_KEY}`
      );

      const movie = (await response.json()) as Movie;

      return movie;
    } catch {
      return { Response: "False" };
    }
  };

  getMovie = async (title: string): Promise<Movie> => {
    const splitQuery = splitter(title);
    const parsedTitle = joiner(splitQuery);

    try {
      const response = await this.fetch(
        `http://www.omdbapi.com/?t=${parsedTitle}&apikey=${process.env.MOVIE_DATABASE_KEY}`
      );

      const movie = (await response.json()) as Movie;

      return movie;
    } catch {
      return { Response: "False" };
    }
  };
}
