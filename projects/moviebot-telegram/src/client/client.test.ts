import { Movie } from "../fetcher/movie/movieFetcher";
import { Fetch } from "./client";
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
    test("getmovie sometitle", async () => {
      const fakeFetch: Fetch = async () => {
        return responseBuilder<Movie>({
          Title: "some-title",
          Response: "true"
        });
      };
      const client = new OMDBClient(fakeFetch);
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

      const client = new OMDBClient(fakeFetch);
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

      const client = new OMDBClient(fakeFetch);
      const expectedMovie: Movie = {
        Response: "False"
      };

      expect(await client.getMovie("some-error-returning-title")).toEqual(
        expectedMovie
      );
    });
  });

  describe("getMovieWithYear", () => {
    test("getmovieWithYear sometitle, someyear", async () => {
      const fakeFetch: Fetch = async () => {
        return responseBuilder<Movie>({
          Title: "some-title",
          Response: "true"
        });
      };
      const client = new OMDBClient(fakeFetch);
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

      const client = new OMDBClient(fakeFetch);
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

      const client = new OMDBClient(fakeFetch);
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
});
