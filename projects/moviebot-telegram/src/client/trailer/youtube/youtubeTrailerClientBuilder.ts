import { IConfig } from "../../../config/config";
import { YoutubeTrailerClient } from "./YoutubeTrailerClient";

export const youtubeTrailerClientBuilder = (
  config: IConfig
): YoutubeTrailerClient | undefined => {
  const { youtubeApiKey } = config.getConfigurationVariables();

  if (youtubeApiKey) {
    return new YoutubeTrailerClient(fetch, config);
  }
};
