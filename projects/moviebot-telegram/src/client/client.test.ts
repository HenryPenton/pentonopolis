import { Movie } from "../fetcher/movie/movieFetcher";
import { Fetch, OMDBClient } from "./client";
describe("omdb client", () => {
  const responseBuilder = <T>(jsonOverride: T): Response => {
    const response: Response = {
      json: function (): Promise<T> {
        return Promise.resolve(jsonOverride);
      }
    } as Response;

    return response;
  };
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
