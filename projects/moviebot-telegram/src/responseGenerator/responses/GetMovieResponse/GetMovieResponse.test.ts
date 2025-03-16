import { Movie } from "../../../client/movie/movieClient";
import { FileClient } from "../../../file/fileClient/fileClient";
import { State } from "../../../State/State";
import { GetMovieResponse } from "./GetMovieResponse";

describe("GetMovieResponse", () => {
  const dummyFileClient = new FileClient<Movie[]>(
    jest.fn(),
    jest.fn(),
    jest.fn()
  );

  test("response says no movies have been set if no movies have been set", () => {
    const state = new State(dummyFileClient);

    expect(new GetMovieResponse(state).fire()).toEqual(
      "No movies have been set yet"
    );
  });

  test("response is one movie if one movie has been set", () => {
    const state = new State(dummyFileClient);
    state.setMovie({ Title: "thingy" });
    expect(new GetMovieResponse(state).fire()).toEqual("1. thingy");
  });

  test("response is multiple movies if multiple movies have been set", () => {
    const state = new State(dummyFileClient);
    state.setMovie({ Title: "thingy" });
    state.setMovie({ Title: "other thingy" });
    expect(new GetMovieResponse(state).fire()).toEqual(
      "1. thingy\n2. other thingy"
    );
  });
});
