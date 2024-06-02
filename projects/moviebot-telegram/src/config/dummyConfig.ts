import { Configuration } from "config-captain";
import { IConfig } from "./config";

type Overrides = { [key: string]: string };

export const getDummyConfig = (overrides: Overrides = {}): IConfig => {
  const dataSource = {
    ...overrides,
    MOVIE_DATABASE_KEY: "some-movie-database-key",
    TELEGRAM_BOT_TOKEN: "some-token",
    YOUTUBE_SEARCH_URL: "https://www.googleapis.com/youtube/v3/search",
    YOUTUBE_WATCH_URL: "https://www.youtube.co.uk/watch",
    OMDB_URL: "http://www.omdbapi.com"
  };

  const dummyConfig: IConfig = new Configuration(
    {
      youtubeApiKey: "YOUTUBE_API_KEY",
      anonymousPolls: "ANONYMOUS_POLLS"
    },
    {
      movieDatabaseKey: "MOVIE_DATABASE_KEY",
      telegramBotToken: "TELEGRAM_BOT_TOKEN",
      youtubeSearchURL: "YOUTUBE_SEARCH_URL",
      youtubeWatchURL: "YOUTUBE_WATCH_URL",
      omdbURL: "OMDB_URL"
    },
    [dataSource]
  );

  return dummyConfig;
};
