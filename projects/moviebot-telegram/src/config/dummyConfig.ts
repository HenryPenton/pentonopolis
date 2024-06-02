import { Configuration } from "config-captain";
import { IConfig } from "./config";

type Overrides = { [key: string]: string };

export const getDummyConfig = (overrides: Overrides = {}): IConfig => {
  const dataSource = {
    MOVIE_DATABASE_KEY: "some-movie-database-key",
    TELEGRAM_BOT_TOKEN: "some-token",
    YOUTUBE_SEARCH_URL: "https://yt-search.com",

    ...overrides
  };

  const dummyConfig: IConfig = new Configuration(
    {
      youtubeApiKey: "YOUTUBE_API_KEY",
      anonymousPolls: "ANONYMOUS_POLLS"
    },
    {
      movieDatabaseKey: "MOVIE_DATABASE_KEY",
      telegramBotToken: "TELEGRAM_BOT_TOKEN",
      youtubeSearchURL: "YOUTUBE_SEARCH_URL"
    },
    [dataSource]
  );

  return dummyConfig;
};
