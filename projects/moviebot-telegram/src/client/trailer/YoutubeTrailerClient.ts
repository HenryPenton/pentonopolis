import { IConfig } from "../../config/config";
import { Fetch } from "../fetch";
import { TrailerClient } from "./trailerClient";

export type YoutubeResponse = {
  items: { id: { videoId: string } }[];
};
export class YoutubeTrailerClient implements TrailerClient {
  constructor(
    private readonly fetch: Fetch,
    private readonly config: IConfig
  ) {}

  private buildSearchURL = (movieName: string): string => {
    const youtubeApiKey =
      this.config.getConfigurationVariableOrUndefined("youtubeApiKey");
    const searchParams = new URLSearchParams();
    searchParams.set("key", youtubeApiKey || "");
    searchParams.set("part", `snippet`);
    searchParams.set("q", `${movieName} movie trailer`);
    const searchURL = new URL(
      `?${searchParams.toString()}`,
      "https://www.googleapis.com/youtube/v3/search"
    );

    return searchURL.toString();
  };

  private buildTrailerURL = (youtubeResponse: YoutubeResponse): string => {
    const trailerParams = new URLSearchParams();
    trailerParams.set("v", youtubeResponse.items[0].id.videoId);

    const trailerURL = new URL(
      `?${trailerParams.toString()}`,
      `https://www.youtube.co.uk/watch`
    );

    return trailerURL.toString();
  };

  getTrailer = async (movieName: string): Promise<string> => {
    const searchURL = this.buildSearchURL(movieName);
    const response = await this.fetch(searchURL);

    const youtubeResponse = (await response.json()) as YoutubeResponse;
    return this.buildTrailerURL(youtubeResponse);
  };
}
