import { Configuration } from "config-captain";

const coreConfig = {
  YOUTUBE_SEARCH_URL: "https://www.googleapis.com/youtube/v3/search"
};

export const config = new Configuration(
  {
    youtubeApiKey: "YOUTUBE_API_KEY",
    anonymousPolls: "ANONYMOUS_POLLS"
  },
  {
    movieDatabaseKey: "MOVIE_DATABASE_KEY",
    telegramBotToken: "TELEGRAM_BOT_TOKEN",
    youtubeSearchURL: "YOUTUBE_SEARCH_URL"
  },
  [coreConfig, process.env]
);

export type IConfig = typeof config;
