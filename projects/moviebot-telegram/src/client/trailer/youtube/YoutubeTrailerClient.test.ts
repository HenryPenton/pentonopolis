import { getDummyConfig } from "../../../config/dummyConfig";
import { Fetch } from "../../fetch";
import { YoutubeResponse, YoutubeTrailerClient } from "./YoutubeTrailerClient";

describe("youtube trailer client", () => {
  const responseBuilder = <T>(jsonOverride: T): Response => {
    const response: Response = {
      json: function (): Promise<T> {
        return Promise.resolve(jsonOverride);
      }
    } as Response;

    return response;
  };

  test("throws if youtube api key not provided", async () => {
    const fakeFetch: Fetch = jest.fn(async () => {
      return responseBuilder<YoutubeResponse>({
        items: [{ id: { videoId: "1234" } }]
      });
    });

    const youtubeClient = (): YoutubeTrailerClient =>
      new YoutubeTrailerClient(fakeFetch, getDummyConfig({}));

    expect(youtubeClient).toThrow();
  });

  test("Gets a trailer for some movie", async () => {
    const fakeFetch: Fetch = jest.fn(async () => {
      return responseBuilder<YoutubeResponse>({
        items: [{ id: { videoId: "1234" } }]
      });
    });

    const youtubeClient = new YoutubeTrailerClient(
      fakeFetch,
      getDummyConfig({
        YOUTUBE_API_KEY: "api-key",
        MOVIE_DATABASE_KEY: "some-movie-database-key",
        TELEGRAM_BOT_TOKEN: "some-token"
      })
    );

    expect(await youtubeClient.getTrailer("some movie")).toEqual(
      `https://www.youtube.co.uk/watch?v=1234`
    );
  });

  test("Gets a trailer for some other movie", async () => {
    const fakeFetch: Fetch = jest.fn(async () => {
      return responseBuilder<YoutubeResponse>({
        items: [{ id: { videoId: "9876" } }]
      });
    });
    const youtubeClient = new YoutubeTrailerClient(
      fakeFetch,
      getDummyConfig({ YOUTUBE_API_KEY: "api-key" })
    );

    expect(await youtubeClient.getTrailer("some movie")).toEqual(
      `https://www.youtube.co.uk/watch?v=9876`
    );
  });

  test("Goes to youtube in expected manner", async () => {
    const fakeFetch: Fetch = jest.fn(async () => {
      return responseBuilder<YoutubeResponse>({
        items: [{ id: { videoId: "9876" } }]
      });
    });

    await new YoutubeTrailerClient(
      fakeFetch,
      getDummyConfig({ YOUTUBE_API_KEY: "api-key" })
    ).getTrailer("some movie");

    expect(fakeFetch).toHaveBeenCalledWith(
      "https://www.googleapis.com/youtube/v3/search?key=api-key&part=snippet&q=some+movie+movie+trailer"
    );
  });
});
