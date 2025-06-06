import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { Telegraf } from "telegraf";
import { State } from "./State/State";
import { OMDBClient } from "./client/movie/OMDBClient";
import { Movie } from "./client/movie/movieClient";
import { youtubeTrailerClientBuilder } from "./client/trailer/youtube/youtubeTrailerClientBuilder";
import { stripCommand } from "./commandParser/commandParser";
import { Commands, SearchType } from "./commands";
import { config } from "./config/config";
import { FileClient } from "./file/fileClient/fileClient";
import { CleanupResponse } from "./responseGenerator/responses/CleanupResponse/CleanupResponse";
import {
  GetMoviePollResponse,
  PollNotReadyError
} from "./responseGenerator/responses/GetMoviePollResponse/GetMoviePollResponse";
import { GetMovieResponse } from "./responseGenerator/responses/GetMovieResponse/GetMovieResponse";
import { GetVotesResponse } from "./responseGenerator/responses/GetVotesResponse/GetVotesResponse";
import { HelpResponse } from "./responseGenerator/responses/HelpResponse/HelpResponse";
import { helpDefinitions } from "./responseGenerator/responses/HelpResponse/helpDefinitions";
import { MovieResponse } from "./responseGenerator/responses/MovieResponse/MovieResponse";
import { RemovieResponse } from "./responseGenerator/responses/RemovieResponse/RemovieResponse";
import { RemoviesResponse } from "./responseGenerator/responses/RemoviesResponse/RemoviesResponse";
import { SetMovieResponse } from "./responseGenerator/responses/SetMovieResponse/SetMovieResponse";

const bot = new Telegraf(config.getConfigurationVariable("telegramBotToken"));
const fileClient = new FileClient<Movie[]>(
  readFileSync,
  writeFileSync,
  mkdirSync
);
const state = new State(fileClient);

const omdbClient = new OMDBClient(fetch, config);
const trailerClient = youtubeTrailerClientBuilder(config);

bot.command(Commands.movie, async (ctx) => {
  const restOfString = stripCommand(ctx.message.text);

  const builder = new MovieResponse(
    restOfString,
    SearchType.WITH_SEARCH_TERM,
    omdbClient,
    trailerClient
  );
  const response = await builder.fire();
  ctx.reply(response);
});

bot.command(Commands.movieyear, async (ctx) => {
  const restOfString = stripCommand(ctx.message.text);

  const builder = new MovieResponse(
    restOfString,
    SearchType.WITH_YEAR,
    omdbClient,
    trailerClient
  );
  const response = await builder.fire();
  ctx.reply(response);
});

bot.command(Commands.movieid, async (ctx) => {
  const restOfString = stripCommand(ctx.message.text);

  const builder = new MovieResponse(
    restOfString,
    SearchType.WITH_ID,
    omdbClient,
    trailerClient
  );
  const response = await builder.fire();
  ctx.reply(response);
});

bot.command(Commands.setmovie, async (ctx) => {
  const restOfString = stripCommand(ctx.message.text);

  const builder = new SetMovieResponse(
    restOfString,
    state,
    SearchType.WITH_SEARCH_TERM,
    omdbClient
  );
  const response = await builder.fire();
  ctx.reply(response);
});

bot.command(Commands.setmovieyear, async (ctx) => {
  const restOfString = stripCommand(ctx.message.text);

  const builder = new SetMovieResponse(
    restOfString,
    state,
    SearchType.WITH_YEAR,
    omdbClient
  );
  const response = await builder.fire();
  ctx.reply(response);
});

bot.command(Commands.setmovieid, async (ctx) => {
  const restOfString = stripCommand(ctx.message.text);

  const builder = new SetMovieResponse(
    restOfString,
    state,
    SearchType.WITH_ID,
    omdbClient
  );
  const response = await builder.fire();
  ctx.reply(response);
});

bot.command(Commands.getmovies, (ctx) => {
  const builder = new GetMovieResponse(state);
  const response = builder.fire();
  ctx.reply(response);
});

bot.command(Commands.removie, (ctx) => {
  const restOfString = stripCommand(ctx.message.text);

  const builder = new RemovieResponse(state, restOfString);
  const response = builder.fire();
  ctx.reply(response);
});

bot.command(Commands.reset, (ctx) => {
  const builder = new RemoviesResponse(state);
  const response = builder.fire();
  ctx.reply(response);
});

bot.command(Commands.cleanup, (ctx) => {
  const builder = new CleanupResponse(state);
  const response = builder.fire();
  ctx.reply(response);
});

bot.command(Commands.moviepoll, (ctx) => {
  const builder = new GetMoviePollResponse(state);
  const anonymousPolls =
    config.getConfigurationVariableOrUndefined("anonymousPolls");
  const pollsAreAnonymous =
    anonymousPolls === undefined || anonymousPolls === "true";

  try {
    const optionsSets = builder.fire();

    optionsSets.forEach((options) => {
      ctx.replyWithPoll("New week new movies", options, {
        allows_multiple_answers: true,
        is_anonymous: pollsAreAnonymous
      });
    });
  } catch (e) {
    if (e instanceof PollNotReadyError) {
      ctx.reply(
        "The poll must have at least 2 movies before it can be started"
      );
    }
  }
});

bot.on("poll", (ctx) => {
  state.updateVotesForPoll(ctx.poll.options);
});

bot.command(Commands.votes, (ctx) => {
  const builder = new GetVotesResponse(state);

  const response = builder.fire();
  ctx.reply(response, { parse_mode: "HTML" });
});

bot.command(Commands.help, (ctx) => {
  const builder = new HelpResponse(helpDefinitions, Object.keys(Commands));
  const response = builder.fire();
  ctx.reply(response);
});

export const launchBot = (): void => {
  bot.launch();
};

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
