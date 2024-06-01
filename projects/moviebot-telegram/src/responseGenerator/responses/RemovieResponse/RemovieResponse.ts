import { State } from "../../../State/State";
import { LocalResponse } from "../LocalResponse";

export class RemovieResponse extends LocalResponse {
  private movieToRemove: string;
  private unfoundResponse: string;

  constructor(state: State, movieToRemove: string) {
    super(state);
    this.movieToRemove = movieToRemove.toLowerCase();
    this.unfoundResponse = "Couldn't find that film in the selection";
  }

  private removeById = (movieId: number): string => {
    const removedMovie = this.state.removie(movieId);
    if (removedMovie) {
      return `${removedMovie} removed from the selection`;
    }

    return this.unfoundResponse;
  };

  private removeByName = (): string => {
    const indexToRemove = this.state
      .getMovies()
      .findIndex((movie) => movie.toLowerCase().startsWith(this.movieToRemove));

    const idToRemove = indexToRemove + 1;

    return this.removeById(idToRemove);
  };

  fire = (): string => {
    const movieId = parseInt(this.movieToRemove, 10);

    if (Number.isInteger(movieId)) {
      return this.removeById(movieId);
    } else {
      return this.removeByName();
    }
  };
}
