import { Client, Fetch, Movie } from "./client";

export class OMDBClient implements Client {
  constructor(private readonly fetch: Fetch) {}
  getMovieWithID = async (id: string): Promise<Movie> => {
    const splitQuery = id.split(" ");
    const parsedId = splitQuery.join("%20");
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
    const splitQuery = title.split(" ");
    const parsedTitle = splitQuery.join("%20");

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
    const splitQuery = title.split(" ");
    const parsedTitle = splitQuery.join("%20");

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
