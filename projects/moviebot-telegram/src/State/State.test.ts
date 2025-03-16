import { Movie } from "../client/movie/movieClient";
import { FileClient } from "../file/fileClient/fileClient";
import { State } from "./State";

describe("state", () => {
  const dummyFileClient: FileClient<Movie[]> = new FileClient<Movie[]>(
    jest.fn(),
    jest.fn()
  );
  test("set and retrieve a movie", () => {
    const state = new State(dummyFileClient);
    state.setMovie({ Title: "movie one" });
    expect(state.getMovies()).toEqual(["movie one"]);
  });

  test("set and retrieve a movie with ratings", () => {
    const state = new State(dummyFileClient);
    state.setMovie({
      Title: "movie one",
      Ratings: [{ Source: "some source", Value: "5/10" }]
    });
    expect(state.getMovies()).toEqual(["movie one (some source Rating: 5/10)"]);
  });

  test("set and retrieve multiple movies", () => {
    const state = new State(dummyFileClient);
    state.setMovie({ Title: "movie two" });
    state.setMovie({ Title: "movie three" });

    expect(state.getMovies()).toEqual(["movie two", "movie three"]);
  });

  test("remove duplicate films (i.e. they have the same imdb id)", () => {
    const state = new State(dummyFileClient);
    state.setMovie({ Title: "movie two", imdbID: "tt1234567" });
    state.setMovie({ Title: "movie two", imdbID: "tt1234567" });
    state.makeUnique();

    expect(state.getMovies()).toEqual(["movie two"]);
  });

  test("the state can be wiped", () => {
    const state = new State(dummyFileClient);
    state.setMovie({ Title: "movie two" });
    state.setMovie({ Title: "movie three" });
    state.removies();

    expect(state.getMovies()).toEqual([]);
  });

  test("a single film can be removed from the state", () => {
    const state = new State(dummyFileClient);
    state.setMovie({ Title: "movie two" });
    state.setMovie({ Title: "movie three" });
    state.removie(1);

    expect(state.getMovies()).toEqual(["movie three"]);
  });

  test("updating poll votes", () => {
    const state = new State(dummyFileClient);
    state.setMovie({ Title: "movie two" });
    state.setMovie({ Title: "movie three" });
    state.updateVotesForPoll([{ text: "movie two", voter_count: 1 }]);
    state.updateVotesForPoll([{ text: "movie two", voter_count: 2 }]);

    expect(state.getPolls()).toEqual([{ text: "movie two", voter_count: 2 }]);
  });

  describe("state saving", () => {
    test("write state", () => {
      const writer = jest.fn();
      const reader = jest.fn();
      const fileClient: FileClient<Movie[]> = new FileClient<Movie[]>(
        reader,
        writer
      );
      const state = new State(fileClient);
      const testMovie: Movie = { Title: "some movie title" };
      state.setMovie(testMovie);

      expect(writer).toHaveBeenCalledWith(
        "state.json",
        '[{"Title":"some movie title"}]'
      );
      expect(writer).toHaveBeenCalledTimes(1);
    });

    test("read state", () => {
      const writer = jest.fn();
      const reader = jest
        .fn()
        .mockReturnValue('[{"Title":"some movie title"}]');
      const fileClient: FileClient<Movie[]> = new FileClient<Movie[]>(
        reader,
        writer
      );
      const state = new State(fileClient);

      expect(state.getMovies()).toEqual(["some movie title"]);
    });
  });
});
