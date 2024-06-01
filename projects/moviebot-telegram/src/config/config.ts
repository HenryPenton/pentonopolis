import { Configuration } from "config-captain";

const required = {
  movieDatabaseKey: "MOVIE_DATABASE_KEY",
  telegramBotToken: "TELEGRAM_BOT_TOKEN"
};
const optional = {
  youtubeApiKey: "YOUTUBE_API_KEY",
  anonymousPolls: "ANONYMOUS_POLLS"
};

export type AllConfig = typeof optional & typeof required;

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
