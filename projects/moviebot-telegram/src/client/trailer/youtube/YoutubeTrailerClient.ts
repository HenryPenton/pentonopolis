import { IConfig } from "../../../config/config";
import { Fetch } from "../../fetch";
import { TrailerClient } from "../trailerClient";

export type YoutubeResponse = {
  items: { id: { videoId: string } }[];
};
export class YoutubeTrailerClient implements TrailerClient {
  private readonly apiKey: string;
  private readonly searchURL: string;
  private readonly watchURL: string;

  constructor(
    private readonly fetch: Fetch,
    config: IConfig
  ) {
    const youtubeApiKey =
      config.getConfigurationVariableOrUndefined("youtubeApiKey");
    if (!youtubeApiKey) throw new YoutubeAPIKeyMissingError();

    this.apiKey = youtubeApiKey;
    this.searchURL = config.getConfigurationVariable("youtubeSearchURL");
    this.watchURL = config.getConfigurationVariable("youtubeWatchURL");
  }

  private buildSearchURL = (movieName: string): string => {
    const searchParams = new URLSearchParams();
    searchParams.set("key", this.apiKey);
    searchParams.set("part", `snippet`);
    searchParams.set("q", `${movieName} movie trailer`);
    const searchURL = new URL(`?${searchParams.toString()}`, this.searchURL);

    return searchURL.toString();
  };

  private buildTrailerURL = (youtubeResponse: YoutubeResponse): string => {
    const trailerParams = new URLSearchParams();
    trailerParams.set("v", youtubeResponse.items[0].id.videoId);

    const trailerURL = new URL(`?${trailerParams.toString()}`, this.watchURL);

    return trailerURL.toString();
  };

  getTrailer = async (movieName: string): Promise<string> => {
    const searchURL = this.buildSearchURL(movieName);
    const response = await this.fetch(searchURL);

    const youtubeResponse = (await response.json()) as YoutubeResponse;
    return this.buildTrailerURL(youtubeResponse);
  };
}

class YoutubeAPIKeyMissingError extends Error {}
