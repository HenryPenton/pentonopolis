import { Configuration } from "config-captain";

export const coreConfig = {
  YOUTUBE_SEARCH_URL: "https://www.googleapis.com/youtube/v3/search",
  YOUTUBE_WATCH_URL: "https://www.youtube.co.uk/watch",
  OMDB_URL: "http://www.omdbapi.com"
};

export const config = new Configuration(
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
  [coreConfig, process.env]
);

export type IConfig = typeof config;
