import { getDummyConfig } from "../../config/dummyConfig";
import { Fetch } from "../fetch";
import { Movie } from "./movieClient";
import { OMDBClient } from "./OMDBClient";
describe("omdb client", () => {
  const responseBuilder = <T>(jsonOverride: T): Response => {
    const response: Response = {
      json: function (): Promise<T> {
        return Promise.resolve(jsonOverride);
      }
    } as Response;

    return response;
  };

  describe("getMovie", () => {
    test("fetcher called with expected url", async () => {
      const fakeFetch: Fetch = jest.fn(async () => {
        return responseBuilder<Movie>({
          Title: "some-title",
          Response: "true"
        });
      });

      const client = new OMDBClient(fakeFetch, getDummyConfig());
      await client.getMovie("some title");

      expect(fakeFetch).toHaveBeenCalledWith(
        "http://www.omdbapi.com/?t=some+title&apikey=some-movie-database-key"
      );
    });

    test("getmovie sometitle", async () => {
      const fakeFetch: Fetch = async () => {
        return responseBuilder<Movie>({
          Title: "some-title",
          Response: "true"
        });
      };
      const client = new OMDBClient(fakeFetch, getDummyConfig());
      const expectedMovie: Movie = { Title: "some-title", Response: "true" };

      expect(await client.getMovie("some title")).toEqual(expectedMovie);
    });

    test("getmovie someothertitle", async () => {
      const fakeFetch: Fetch = async () => {
        return responseBuilder<Movie>({
          Title: "some-other-title",
          Response: "true"
        });
      };

      const client = new OMDBClient(fakeFetch, getDummyConfig());
      const expectedMovie: Movie = {
        Title: "some-other-title",
        Response: "true"
      };

      expect(await client.getMovie("some-other-title")).toEqual(expectedMovie);
    });

    test("failure response", async () => {
      const fakeFetch: Fetch = async () => {
        throw new Error("something went wrong");
      };

      const client = new OMDBClient(fakeFetch, getDummyConfig());
      const expectedMovie: Movie = {
        Response: "False"
      };

      expect(await client.getMovie("some-error-returning-title")).toEqual(
        expectedMovie
      );
    });
  });

  describe("getMovieWithYear", () => {
    test("fetcher called with expected url", async () => {
      const fakeFetch: Fetch = jest.fn(async () => {
        return responseBuilder<Movie>({
          Title: "some-title",
          Response: "true"
        });
      });
      const config = getDummyConfig();

      const client = new OMDBClient(fakeFetch, config);
      await client.getMovieWithYear("some title", "1234");

      expect(fakeFetch).toHaveBeenCalledWith(
        "http://www.omdbapi.com/?t=some+title&y=1234&apikey=some-movie-database-key"
      );
    });
    test("getmovieWithYear sometitle, someyear", async () => {
      const fakeFetch: Fetch = async () => {
        return responseBuilder<Movie>({
          Title: "some-title",
          Response: "true"
        });
      };
      const client = new OMDBClient(fakeFetch, getDummyConfig());
      const expectedMovie: Movie = { Title: "some-title", Response: "true" };

      expect(await client.getMovieWithYear("some title", "1234")).toEqual(
        expectedMovie
      );
    });

    test("getMovieWithYear someothertitle", async () => {
      const fakeFetch: Fetch = async () => {
        return responseBuilder<Movie>({
          Title: "some-other-title",
          Response: "true"
        });
      };

      const client = new OMDBClient(fakeFetch, getDummyConfig());
      const expectedMovie: Movie = {
        Title: "some-other-title",
        Response: "true"
      };
      expect(await client.getMovieWithYear("some other title", "4321")).toEqual(
        expectedMovie
      );
    });

    test("failure response", async () => {
      const fakeFetch: Fetch = async () => {
        throw new Error("something went wrong");
      };

      const client = new OMDBClient(fakeFetch, getDummyConfig());
      const expectedMovie: Movie = {
        Response: "False"
      };

      expect(
        await client.getMovieWithYear(
          "some-error-returning-title",
          "not a year"
        )
      ).toEqual(expectedMovie);
    });
  });

  describe("getMovieById", () => {
    test("fetcher called with expected url", async () => {
      const fakeFetch: Fetch = jest.fn(async () => {
        return responseBuilder<Movie>({
          Title: "some-title",
          Response: "true"
        });
      });

      const client = new OMDBClient(fakeFetch, getDummyConfig());
      await client.getMovieWithID("some-id");

      expect(fakeFetch).toHaveBeenCalledWith(
        "http://www.omdbapi.com/?i=some-id&apikey=some-movie-database-key"
      );
    });
    test("getMovieById some id", async () => {
      const fakeFetch: Fetch = async () => {
        return responseBuilder<Movie>({
          Title: "some-title",
          Response: "true"
        });
      };
      const client = new OMDBClient(fakeFetch, getDummyConfig());
      const expectedMovie: Movie = { Title: "some-title", Response: "true" };

      expect(await client.getMovieWithID("some-id")).toEqual(expectedMovie);
    });

    test("getMovieById some other id", async () => {
      const fakeFetch: Fetch = async () => {
        return responseBuilder<Movie>({
          Title: "some-other-title",
          Response: "true"
        });
      };

      const client = new OMDBClient(fakeFetch, getDummyConfig());
      const expectedMovie: Movie = {
        Title: "some-other-title",
        Response: "true"
      };
      expect(await client.getMovieWithID("some other id")).toEqual(
        expectedMovie
      );
    });

    test("failure response", async () => {
      const fakeFetch: Fetch = async () => {
        throw new Error("something went wrong");
      };

      const client = new OMDBClient(fakeFetch, getDummyConfig());
      const expectedMovie: Movie = {
        Response: "False"
      };

      expect(await client.getMovieWithID("some-bad-id-or-something")).toEqual(
        expectedMovie
      );
    });
  });
});
