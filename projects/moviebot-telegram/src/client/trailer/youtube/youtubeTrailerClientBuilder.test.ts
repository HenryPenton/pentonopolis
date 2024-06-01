import { YoutubeTrailerClient } from "./YoutubeTrailerClient";
import { youtubeTrailerClientBuilder } from "./youtubeTrailerClientBuilder";
import { getDummyConfig } from "../../../config/dummyConfig";
describe("youtubeTrailerClientBuilder", () => {
  test("builds client if it has a youtube api key", () => {
    const config = getDummyConfig({ YOUTUBE_API_KEY: "youtubeApiKey" });

    expect(youtubeTrailerClientBuilder(config)).toBeInstanceOf(
      YoutubeTrailerClient
    );
  });

  test("doesnt build a trailer client if no key provided", () => {
    const config = getDummyConfig();

    expect(youtubeTrailerClientBuilder(config)).toBeUndefined();
  });
});
