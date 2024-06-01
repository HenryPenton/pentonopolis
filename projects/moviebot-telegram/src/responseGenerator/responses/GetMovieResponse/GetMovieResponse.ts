import { State } from "../../../State/State";
import { LocalResponse } from "../LocalResponse";

export class GetMovieResponse extends LocalResponse {
  constructor(state: State) {
    super(state);
  }

  fire = (): string => {
    const movieSelection = this.state.getMovies();
    const movies = movieSelection.map(
      (movie, index) => `${index + 1}. ${movie}`
    );

    return movies.length === 0
      ? "No movies have been set yet"
      : movies.join("\n");
  };
}
