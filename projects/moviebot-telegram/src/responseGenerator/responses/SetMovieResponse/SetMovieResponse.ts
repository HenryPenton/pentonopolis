import { MovieClient } from "../../../client/movie/movieClient";
import { SearchType } from "../../../commands";
import { State } from "../../../State/State";
import { getMovieRatings } from "../../../utils/getMovieRatings";
import { AsyncMovieResponse } from "../AsyncMovieResponse";

export class SetMovieResponse extends AsyncMovieResponse {
  movieName: string;
  state: State;
  completeResponse: string;
  multiMovie: boolean;
  processedMovies: string[];
  moviesToSearchFor: string[];

  constructor(
    queryString: string,
    state: State,
    searchType: SearchType,
    client: MovieClient
  ) {
    super(queryString, searchType, client);

    this.state = state;
    this.completeResponse = "";
    this.movieName = queryString;
    this.moviesToSearchFor = this.queryString.split("%%");
    this.multiMovie = this.moviesToSearchFor.length > 1;
    this.processedMovies = [];
  }

  private addMovieToState = (): void => {
    const movieTitle = this.movie.Title;
    const movieRating = getMovieRatings(this.movie);
    if (movieTitle) {
      this.state.setMovie(this.movie);
      if (movieRating) {
        const titleWithRating = `${movieTitle} ${movieRating}`;
        this.processedMovies.push(titleWithRating);
      } else {
        this.processedMovies.push(movieTitle);
      }
    }
  };

  private compileResponse = (): string => {
    if (this.processedMovies.length === 1) {
      return `${this.processedMovies[0]} added to the film selection`;
    } else if (this.processedMovies.length > 1) {
      let response = "";
      for (let index = 0; index < this.processedMovies.length; index++) {
        const setMovie = this.processedMovies[index];
        if (index === this.processedMovies.length - 1) {
          response = `${response} and ${setMovie}`;
        } else if (index === 0) {
          response = setMovie;
        } else {
          response = `${response}, ${setMovie}`;
        }
      }
      response = `${response} added to the film selection`;
      return response;
    }

    return this.multiMovie
      ? "Couldn't find those films"
      : "Couldn't find that film";
  };

  fire = async (): Promise<string> => {
    try {
      if (this.multiMovie) {
        for (let index = 0; index < this.moviesToSearchFor.length; index++) {
          const movieToSearchFor = this.moviesToSearchFor[index].trim();
          this.queryString = movieToSearchFor;
          this.movie = await this.getMovie();
          this.addMovieToState();

          this.completeResponse = this.compileResponse();
        }
      } else {
        this.movie = await this.getMovie();

        this.addMovieToState();

        this.completeResponse = this.compileResponse();
      }
      return this.completeResponse;
    } catch (e) {
      return this.generateErrorReponse(e);
    }
  };
}
