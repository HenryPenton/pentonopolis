import { Client, Movie } from "../../client/client";
import { SearchType } from "../../commands";

import { Response } from "./Response";

export class MovieNotProvidedError extends Error {}
export class MovieAndYearNotProvidedError extends Error {}
export class MovieIDNotProvided extends Error {}

export abstract class AsyncMovieResponse extends Response {
  movie: Movie;
  searchType: SearchType;
  queryString: string;
  constructor(
    queryString: string,
    searchType: SearchType,
    private readonly client: Client
  ) {
    super();
    this.movie = {};
    this.queryString = queryString;
    this.searchType = searchType;
  }

  protected getMovie = async (): Promise<Movie> => {
    const noQueryString = this.queryString === "";
    switch (this.searchType) {
      case SearchType.WITH_YEAR: {
        if (noQueryString) throw new MovieAndYearNotProvidedError();

        const querySplit = this.queryString.split(" ");
        const movieYear = querySplit[querySplit.length - 1];

        querySplit.pop();
        const queryStringWithoutYear = querySplit.join(" ");
        return this.client.getMovieWithYear(queryStringWithoutYear, movieYear);
      }
      case SearchType.WITH_ID:
        if (noQueryString) throw new MovieIDNotProvided();
        return this.client.getMovieWithID(this.queryString);

      case SearchType.WITH_SEARCH_TERM:
        if (noQueryString) throw new MovieNotProvidedError();
        return this.client.getMovie(this.queryString);
    }
  };

  protected generateErrorReponse = (e: unknown): string => {
    switch (true) {
      case e instanceof MovieNotProvidedError:
        return "Please specify a movie!";
      case e instanceof MovieIDNotProvided:
        return "Please specify an IMDB ID!";
      case e instanceof MovieAndYearNotProvidedError:
        return "Please specify a movie and year!";
      default:
        return "Something went wrong!";
    }
  };
}
