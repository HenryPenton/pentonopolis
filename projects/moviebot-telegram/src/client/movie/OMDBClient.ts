import { Fetch } from "../fetch";
import { Movie, MovieClient } from "./movieClient";

export class OMDBClient implements MovieClient {
  constructor(private readonly fetch: Fetch) {}

  private buildURL = (params: { [key: string]: string }): string => {
    const parameterMap = new Map(Object.entries(params));
    const urlSearchParams = new URLSearchParams();

    parameterMap.forEach((parameter, key) => {
      urlSearchParams.set(key, parameter);
    });
    urlSearchParams.set("apikey", process.env.MOVIE_DATABASE_KEY || "");

    const queryString = urlSearchParams.toString();
    const url = new URL(`?${queryString}`, "http://www.omdbapi.com");
    return url.toString();
  };

  getMovieWithID = async (id: string): Promise<Movie> => {
    try {
      const response = await this.fetch(this.buildURL({ i: id }));

      const movie = (await response.json()) as Movie;

      return movie;
    } catch {
      return { Response: "False" };
    }
  };

  getMovieWithYear = async (title: string, year: string): Promise<Movie> => {
    try {
      const response = await this.fetch(this.buildURL({ t: title, y: year }));

      const movie = (await response.json()) as Movie;

      return movie;
    } catch {
      return { Response: "False" };
    }
  };

  getMovie = async (title: string): Promise<Movie> => {
    try {
      const response = await this.fetch(this.buildURL({ t: title }));

      const movie = (await response.json()) as Movie;

      return movie;
    } catch {
      return { Response: "False" };
    }
  };
}
