import { Movie } from "../../../client/movie/movieClient";
import { FileClient } from "../../../file/fileClient/fileClient";
import { State } from "../../../State/State";
import { CleanupResponse } from "./CleanupResponse";

describe("CleanupResponse", () => {
  const dummyFileClient = new FileClient<Movie[]>(
    jest.fn(),
    jest.fn(),
    jest.fn()
  );

  test("response", () => {
    expect(new CleanupResponse(new State(dummyFileClient)).fire()).toBe(
      "Duplicates in the movie selection have been removed"
    );
  });

  test("cleanup makes the state unique (based on imdb id)", () => {
    const state = new State(dummyFileClient);
    state.setMovie({ Title: "abcde", imdbID: "tt1234567" });
    state.setMovie({ Title: "abcde", imdbID: "tt1234567" });
    new CleanupResponse(state).fire();
    expect(state.getMovies()).toHaveLength(1);
  });

  test("cleanup leaves movies with non matching imdb ids", () => {
    const state = new State(dummyFileClient);
    state.setMovie({ Title: "abcde", imdbID: "tt7654321" });
    state.setMovie({ Title: "abcde", imdbID: "tt1234567" });
    new CleanupResponse(state).fire();
    expect(state.getMovies()).toHaveLength(2);
  });

  test("cleanup leaves movies with no imdb ids", () => {
    const state = new State(dummyFileClient);
    state.setMovie({ Title: "abcde" });
    state.setMovie({ Title: "abcde" });
    new CleanupResponse(state).fire();
    expect(state.getMovies()).toHaveLength(2);
  });
});
