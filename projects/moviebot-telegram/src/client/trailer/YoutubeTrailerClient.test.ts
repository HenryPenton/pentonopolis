import { Fetch } from "../fetch";
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

  test("Gets a trailer for some movie", async () => {
    const fakeFetch: Fetch = jest.fn(async () => {
      return responseBuilder<YoutubeResponse>({
        items: [{ id: { videoId: "1234" } }]
      });
    });
    const youtubeClient = new YoutubeTrailerClient(fakeFetch);

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
    const youtubeClient = new YoutubeTrailerClient(fakeFetch);

    expect(await youtubeClient.getTrailer("some movie")).toEqual(
      `https://www.youtube.co.uk/watch?v=9876`
    );
  });
});