import { SearchType } from "../../../commands";
import * as MF from "../../../fetcher/movie/movieFetcher";
import { MovieResponse } from "./MovieResponse";

describe("only command given", () => {
  test("only movie command given", async () => {
    const mR = new MovieResponse("", SearchType.WITH_SEARCH_TERM);

    expect(await mR.fire()).toBe("Please specify a movie!");
  });

  test("only movieyear command given", async () => {
    const mR = new MovieResponse("", SearchType.WITH_YEAR);

    expect(await mR.fire()).toBe("Please specify a movie and year!");
  });

  test("only movieid command given", async () => {
    const mR = new MovieResponse("", SearchType.WITH_ID);

    expect(await mR.fire()).toBe("Please specify an IMDB ID!");
  });

  test("only movieid command given", async () => {
    const mR = new MovieResponse("", SearchType.WITH_ID);

    expect(await mR.fire()).toBe("Please specify an IMDB ID!");
  });

  test("non existent state", async () => {
    const mR = new MovieResponse(
      "",
      "some non existent search type" as unknown as SearchType
    );

    expect(await mR.fire()).toBe("Something went wrong!");
  });
});

describe("movie responses with just title", () => {
  test("get a movie by imdb id", async () => {
    const mR = new MovieResponse("tt12345457", SearchType.WITH_ID);
    jest
      .spyOn(MF, "getMovieWithID")
      .mockResolvedValueOnce({ Title: "thingy movie", imdbID: "tt12345457" });
    expect(await mR.fire()).toBe("Movie: thingy movie");
  }, 10000);

  test("get a movie by title", async () => {
    const mR = new MovieResponse("Finding nemo", SearchType.WITH_SEARCH_TERM);
    jest.spyOn(MF, "getMovie").mockResolvedValueOnce({ Title: "Finding nemo" });
    expect(await mR.fire()).toBe("Movie: Finding nemo");
  });

  test("get a movie by with year", async () => {
    const mR = new MovieResponse("thingy movie (1996)", SearchType.WITH_YEAR);
    jest
      .spyOn(MF, "getMovieWithYear")
      .mockResolvedValueOnce({ Title: "thingy movie" });
    expect(await mR.fire()).toBe("Movie: thingy movie");
  });
});

describe("movie responses with other information", () => {
  const genericMovieInfo: Partial<MF.Movie> = {
    Runtime: "runtime",
    Director: "director",
    Ratings: [{ Source: "source", Value: "value" }],
    Plot: "dude where is my automobile",
    Year: "1995"
  };
  test("get a movie by imdb id", async () => {
    const mR = new MovieResponse("tt12345457", SearchType.WITH_ID);
    jest.spyOn(MF, "getMovieWithID").mockResolvedValueOnce({
      Title: "thingy movie",
      imdbID: "tt12345457",
      ...genericMovieInfo
    });
    expect(await mR.fire()).toBe(
      `Movie: thingy movie (1995)\n\nRuntime: runtime\n\nsource: value\n\nDirector: director\n\nPlot: dude where is my automobile`
    );
  });

  test("get a movie by title", async () => {
    const mR = new MovieResponse("Finding nemo", SearchType.WITH_SEARCH_TERM);
    jest
      .spyOn(MF, "getMovie")
      .mockResolvedValueOnce({ Title: "Finding Nemo", ...genericMovieInfo });
    expect(await mR.fire()).toBe(
      `Movie: Finding Nemo (1995)\n\nRuntime: runtime\n\nsource: value\n\nDirector: director\n\nPlot: dude where is my automobile`
    );
  });

  test("get a movie by with year", async () => {
    const mR = new MovieResponse("thingy movie (1996)", SearchType.WITH_YEAR);
    jest
      .spyOn(MF, "getMovieWithYear")
      .mockResolvedValueOnce({ Title: "thingy movie", ...genericMovieInfo });
    expect(await mR.fire()).toBe(
      `Movie: thingy movie (1995)\n\nRuntime: runtime\n\nsource: value\n\nDirector: director\n\nPlot: dude where is my automobile`
    );
  });
});

describe("movie responses with other information", () => {
  const genericMovieInfo: Partial<MF.Movie> = {
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
    const mR = new MovieResponse("tt12345457", SearchType.WITH_ID);
    jest.spyOn(MF, "getMovieWithID").mockResolvedValueOnce({
      Title: "thingy movie",
      imdbID: "tt12345457",
      ...genericMovieInfo
    });
    expect(await mR.fire()).toBe(
      `Movie: thingy movie (1995)\n\nRuntime: runtime\n\nsource: value\nsriracha: tasty\n\nDirector: director\n\nPlot: dude where is my automobile`
    );
  });
});

describe("unknown movie", () => {
  test("no response movie", async () => {
    const mR = new MovieResponse("thingy movie (1996)", SearchType.WITH_YEAR);

    jest
      .spyOn(MF, "getMovieWithYear")
      .mockResolvedValueOnce({ Response: "False" });

    expect(await mR.fire()).toBe(`Unknown movie`);
  });

  test("no title movie", async () => {
    const mR = new MovieResponse("thingy movie (1996)", SearchType.WITH_YEAR);

    jest
      .spyOn(MF, "getMovieWithYear")
      .mockResolvedValueOnce({ Title: undefined });

    expect(await mR.fire()).toBe(`Unknown movie`);
  });
});
