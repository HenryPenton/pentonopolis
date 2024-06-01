import { Configuration } from "config-captain";
import { IConfig } from "./config";

type Overrides = { [key: string]: string };
export const getDummyConfig = (overrides: Overrides = {}): IConfig => {
  const dataSource = {
    MOVIE_DATABASE_KEY: "some-movie-database-key",
    TELEGRAM_BOT_TOKEN: "some-token",

    ...overrides
  };

  const dummyConfig: IConfig = new Configuration(
    {
      youtubeApiKey: "YOUTUBE_API_KEY",
      anonymousPolls: "ANONYMOUS_POLLS"
    },
    {
      movieDatabaseKey: "MOVIE_DATABASE_KEY",
      telegramBotToken: "TELEGRAM_BOT_TOKEN"
    },
    [dataSource]
  );

  return dummyConfig;
};
