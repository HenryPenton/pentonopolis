import { Fetch } from "../fetch";
import { TrailerClient } from "./trailerClient";

export type YoutubeResponse = {
  items: { id: { videoId: string } }[];
};
export class YoutubeTrailerClient implements TrailerClient {
  constructor(private readonly fetch: Fetch) {}

  getTrailer = async (movieName: string): Promise<string> => {
    const response = await this.fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&part=snippet&q=${movieName}%20movie%20trailer`
    );
    const youtubeResponse = (await response.json()) as YoutubeResponse;
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set("v", youtubeResponse.items[0].id.videoId);

    const trailerURL = new URL(
      `?${urlSearchParams.toString()}`,
      `https://www.youtube.co.uk/watch`
    );

    return trailerURL.toString();
  };
}
