import { Configuration } from "config-captain";

export const config = new Configuration(
  {
    youtubeApiKey: "YOUTUBE_API_KEY",
    anonymousPolls: "ANONYMOUS_POLLS"
  },
  {
    movieDatabaseKey: "MOVIE_DATABASE_KEY",
    telegramBotToken: "TELEGRAM_BOT_TOKEN"
  },
  [process.env]
);

export type IConfig = typeof config;
