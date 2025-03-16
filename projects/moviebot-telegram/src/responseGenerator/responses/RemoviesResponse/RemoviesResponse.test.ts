import { Movie } from "../../../client/movie/movieClient";
import { FileClient } from "../../../file/fileClient/fileClient";
import { State } from "../../../State/State";
import { RemoviesResponse } from "./RemoviesResponse";

describe("removies response", () => {
  const dummyFileClient = new FileClient<Movie[]>(jest.fn(), jest.fn());

  test("expected response", () => {
    const state = new State(dummyFileClient);
    expect(new RemoviesResponse(state).fire()).toEqual(
      "The movie selection has been reset"
    );
  });
});
