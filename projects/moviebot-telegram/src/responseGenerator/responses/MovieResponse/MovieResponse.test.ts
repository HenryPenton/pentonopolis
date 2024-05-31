import { Movie, MovieClient } from "../../../client/movie/movieClient";
import { TrailerClient } from "../../../client/trailer/trailerClient";
import { SearchType } from "../../../commands";
import { MovieResponse } from "./MovieResponse";

const getDummyMovieClient = (movieOverride?: Movie): MovieClient => {
  const movieResponse = async (): Promise<Movie> => {
    const movie: Movie = movieOverride ?? { Response: "False" };
    return movie;
  };

  const movieClient: MovieClient = {
    getMovie: movieResponse,
    getMovieWithYear: movieResponse,
    getMovieWithID: movieResponse
  };

  return movieClient;
};

const getDummyTrailerClient = (trailerOverride?: string): TrailerClient => {
  const trailerResponse = async (): Promise<string> => {
    const trailer: string = trailerOverride ?? "";
    return trailer;
  };

  const trailerClient: TrailerClient = {
    getTrailer: trailerResponse
  };

  return trailerClient;
};

describe("only command given", () => {
  test("only movie command given", async () => {
    const client = getDummyMovieClient();
    const trailerClient = getDummyTrailerClient();
    const mR = new MovieResponse(
      "",
      SearchType.WITH_SEARCH_TERM,
      client,
      trailerClient
    );

    expect(await mR.fire()).toBe("Please specify a movie!");
  });

  test("only movieyear command given", async () => {
    const client = getDummyMovieClient();
    const trailerClient = getDummyTrailerClient();
    const mR = new MovieResponse(
      "",
      SearchType.WITH_YEAR,
      client,
      trailerClient
    );

    expect(await mR.fire()).toBe("Please specify a movie and year!");
  });

  test("only movieid command given", async () => {
    const client = getDummyMovieClient();
    const trailerClient = getDummyTrailerClient();
    const mR = new MovieResponse("", SearchType.WITH_ID, client, trailerClient);

    expect(await mR.fire()).toBe("Please specify an IMDB ID!");
  });

  test("only movieid command given", async () => {
    const client = getDummyMovieClient();
    const trailerClient = getDummyTrailerClient();
    const mR = new MovieResponse("", SearchType.WITH_ID, client, trailerClient);

    expect(await mR.fire()).toBe("Please specify an IMDB ID!");
  });

  test("non existent state", async () => {
    const client = getDummyMovieClient();
    const trailerClient = getDummyTrailerClient();
    const mR = new MovieResponse(
      "",
      "some non existent search type" as unknown as SearchType,
      client,
      trailerClient
    );

    expect(await mR.fire()).toBe("Something went wrong!");
  });
});

describe("movie responses with just title", () => {
  test("get a movie by imdb id", async () => {
    const trailerClient = getDummyTrailerClient();
    const client = getDummyMovieClient({
      Title: "thingy movie",
      imdbID: "tt12345457"
    });
    const mR = new MovieResponse(
      "tt12345457",
      SearchType.WITH_ID,
      client,
      trailerClient
    );

    expect(await mR.fire()).toBe("Movie: thingy movie");
  }, 10000);

  test("get a movie by title", async () => {
    const trailerClient = getDummyTrailerClient();
    const client = getDummyMovieClient({ Title: "Finding nemo" });
    const mR = new MovieResponse(
      "Finding nemo",
      SearchType.WITH_SEARCH_TERM,
      client,
      trailerClient
    );

    expect(await mR.fire()).toBe("Movie: Finding nemo");
  });

  test("get a movie by with year", async () => {
    const trailerClient = getDummyTrailerClient();
    const client = getDummyMovieClient({ Title: "thingy movie" });
    const mR = new MovieResponse(
      "thingy movie (1996)",
      SearchType.WITH_YEAR,
      client,
      trailerClient
    );

    expect(await mR.fire()).toBe("Movie: thingy movie");
  });
});

describe("movie responses with other information", () => {
  const genericMovieInfo: Partial<Movie> = {
    Runtime: "runtime",
    Director: "director",
    Ratings: [{ Source: "source", Value: "value" }],
    Plot: "dude where is my automobile",
    Year: "1995"
  };
  test("get a movie by imdb id", async () => {
    const trailerClient = getDummyTrailerClient();
    const client = getDummyMovieClient({
      Title: "thingy movie",
      imdbID: "tt12345457",
      ...genericMovieInfo
    });
    const mR = new MovieResponse(
      "tt12345457",
      SearchType.WITH_ID,
      client,
      trailerClient
    );

    expect(await mR.fire()).toBe(
      `Movie: thingy movie (1995)\n\nRuntime: runtime\n\nsource: value\n\nDirector: director\n\nPlot: dude where is my automobile`
    );
  });

  test("get a movie by title", async () => {
    const trailerClient = getDummyTrailerClient();
    const client = getDummyMovieClient({
      Title: "Finding Nemo",
      ...genericMovieInfo
    });
    const mR = new MovieResponse(
      "Finding nemo",
      SearchType.WITH_SEARCH_TERM,
      client,
      trailerClient
    );

    expect(await mR.fire()).toBe(
      `Movie: Finding Nemo (1995)\n\nRuntime: runtime\n\nsource: value\n\nDirector: director\n\nPlot: dude where is my automobile`
    );
  });

  test("get a movie by with year", async () => {
    const trailerClient = getDummyTrailerClient();
    const client = getDummyMovieClient({
      Title: "thingy movie",
      ...genericMovieInfo
    });
    const mR = new MovieResponse(
      "thingy movie (1996)",
      SearchType.WITH_YEAR,
      client,
      trailerClient
    );

    expect(await mR.fire()).toBe(
      `Movie: thingy movie (1995)\n\nRuntime: runtime\n\nsource: value\n\nDirector: director\n\nPlot: dude where is my automobile`
    );
  });
});

describe("movie responses with other information", () => {
  const genericMovieInfo: Partial<Movie> = {
    Runtime: "runtime",
    Director: "director",
    Ratings: [
      { Source: "source", Value: "value" },
      { Source: "sriracha", Value: "tasty" }
    ],
    Plot: "dude where is my automobile",
    Year: "1995"
  };
  test("movie with multiple ratings", async () => {
    const trailerClient = getDummyTrailerClient();
    const client = getDummyMovieClient({
      Title: "thingy movie",
      imdbID: "tt12345457",
      ...genericMovieInfo
    });
    const mR = new MovieResponse(
      "tt12345457",
      SearchType.WITH_ID,
      client,
      trailerClient
    );

    expect(await mR.fire()).toBe(
      `Movie: thingy movie (1995)\n\nRuntime: runtime\n\nsource: value\nsriracha: tasty\n\nDirector: director\n\nPlot: dude where is my automobile`
    );
  });
});

describe("unknown movie", () => {
  test("no response movie", async () => {
    const trailerClient = getDummyTrailerClient();
    const client = getDummyMovieClient({ Response: "False" });
    const mR = new MovieResponse(
      "thingy movie (1996)",
      SearchType.WITH_YEAR,
      client,
      trailerClient
    );

    expect(await mR.fire()).toBe(`Unknown movie`);
  });

  test("no title movie", async () => {
    const trailerClient = getDummyTrailerClient();
    const client = getDummyMovieClient({ Title: undefined });
    const mR = new MovieResponse(
      "thingy movie (1996)",
      SearchType.WITH_YEAR,
      client,
      trailerClient
    );

    expect(await mR.fire()).toBe(`Unknown movie`);
  });
});
