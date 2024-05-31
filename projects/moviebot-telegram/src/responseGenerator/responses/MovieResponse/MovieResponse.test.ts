import { Client, Movie } from "../../../client/client";
import { SearchType } from "../../../commands";
import { MovieResponse } from "./MovieResponse";

const getDummyClient = (movieOverride?: Movie): Client => {
  const response = async (): Promise<Movie> => {
    const movie: Movie = movieOverride ?? { Response: "False" };
    return movie;
  };

  const client: Client = {
    getMovie: response,
    getMovieWithYear: response,
    getMovieWithID: response
  };

  return client;
};
describe("only command given", () => {
  test("only movie command given", async () => {
    const client = getDummyClient();
    const mR = new MovieResponse("", SearchType.WITH_SEARCH_TERM, client);

    expect(await mR.fire()).toBe("Please specify a movie!");
  });

  test("only movieyear command given", async () => {
    const client = getDummyClient();
    const mR = new MovieResponse("", SearchType.WITH_YEAR, client);

    expect(await mR.fire()).toBe("Please specify a movie and year!");
  });

  test("only movieid command given", async () => {
    const client = getDummyClient();
    const mR = new MovieResponse("", SearchType.WITH_ID, client);

    expect(await mR.fire()).toBe("Please specify an IMDB ID!");
  });

  test("only movieid command given", async () => {
    const client = getDummyClient();
    const mR = new MovieResponse("", SearchType.WITH_ID, client);

    expect(await mR.fire()).toBe("Please specify an IMDB ID!");
  });

  test("non existent state", async () => {
    const client = getDummyClient();
    const mR = new MovieResponse(
      "",
      "some non existent search type" as unknown as SearchType,
      client
    );

    expect(await mR.fire()).toBe("Something went wrong!");
  });
});

describe("movie responses with just title", () => {
  test("get a movie by imdb id", async () => {
    const client = getDummyClient({
      Title: "thingy movie",
      imdbID: "tt12345457"
    });
    const mR = new MovieResponse("tt12345457", SearchType.WITH_ID, client);

    expect(await mR.fire()).toBe("Movie: thingy movie");
  }, 10000);

  test("get a movie by title", async () => {
    const client = getDummyClient({ Title: "Finding nemo" });
    const mR = new MovieResponse(
      "Finding nemo",
      SearchType.WITH_SEARCH_TERM,
      client
    );

    expect(await mR.fire()).toBe("Movie: Finding nemo");
  });

  test("get a movie by with year", async () => {
    const client = getDummyClient({ Title: "thingy movie" });
    const mR = new MovieResponse(
      "thingy movie (1996)",
      SearchType.WITH_YEAR,
      client
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
    const client = getDummyClient({
      Title: "thingy movie",
      imdbID: "tt12345457",
      ...genericMovieInfo
    });
    const mR = new MovieResponse("tt12345457", SearchType.WITH_ID, client);

    expect(await mR.fire()).toBe(
      `Movie: thingy movie (1995)\n\nRuntime: runtime\n\nsource: value\n\nDirector: director\n\nPlot: dude where is my automobile`
    );
  });

  test("get a movie by title", async () => {
    const client = getDummyClient({
      Title: "Finding Nemo",
      ...genericMovieInfo
    });
    const mR = new MovieResponse(
      "Finding nemo",
      SearchType.WITH_SEARCH_TERM,
      client
    );

    expect(await mR.fire()).toBe(
      `Movie: Finding Nemo (1995)\n\nRuntime: runtime\n\nsource: value\n\nDirector: director\n\nPlot: dude where is my automobile`
    );
  });

  test("get a movie by with year", async () => {
    const client = getDummyClient({
      Title: "thingy movie",
      ...genericMovieInfo
    });
    const mR = new MovieResponse(
      "thingy movie (1996)",
      SearchType.WITH_YEAR,
      client
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
    const client = getDummyClient({
      Title: "thingy movie",
      imdbID: "tt12345457",
      ...genericMovieInfo
    });
    const mR = new MovieResponse("tt12345457", SearchType.WITH_ID, client);

    expect(await mR.fire()).toBe(
      `Movie: thingy movie (1995)\n\nRuntime: runtime\n\nsource: value\nsriracha: tasty\n\nDirector: director\n\nPlot: dude where is my automobile`
    );
  });
});

describe("unknown movie", () => {
  test("no response movie", async () => {
    const client = getDummyClient({ Response: "False" });
    const mR = new MovieResponse(
      "thingy movie (1996)",
      SearchType.WITH_YEAR,
      client
    );

    expect(await mR.fire()).toBe(`Unknown movie`);
  });

  test("no title movie", async () => {
    const client = getDummyClient({ Title: undefined });
    const mR = new MovieResponse(
      "thingy movie (1996)",
      SearchType.WITH_YEAR,
      client
    );

    expect(await mR.fire()).toBe(`Unknown movie`);
  });
});
