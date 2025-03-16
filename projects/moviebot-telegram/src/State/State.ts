import { PollOption } from "telegraf/typings/core/types/typegram";
import { Movie } from "../client/movie/movieClient";
import { FileClient } from "../file/fileClient/fileClient";
import { getMovieRatings } from "../utils/getMovieRatings";
import { removeFromArray } from "../utils/removeFromArray";

export type MoviePollId = string;

export class State {
  private movies: Movie[];
  private polls: PollOption[];

  constructor(private readonly fileClient: FileClient<Movie[]>) {
    const readMovies = this.fileClient.read("./state.json");
    this.movies = readMovies;
    this.polls = [];
  }

  updateVotesForPoll = (userVotes: PollOption[]): void => {
    userVotes.forEach((userVote) => {
      const potentialVote = this.polls.findIndex(
        (poll) => poll.text === userVote.text
      );

      if (potentialVote > -1) {
        this.polls = removeFromArray(this.polls, this.polls[potentialVote]);
      }

      this.polls.push(userVote);
    });
  };

  getPolls = (): PollOption[] => this.polls;

  resetPolls = (): void => {
    this.polls = [];
  };

  setMovie = (movie: Movie): void => {
    this.movies.push(movie);
    this.fileClient.write("./state.json", this.movies);
  };

  getMovies = (): string[] => {
    return this.movies.map((movie) => {
      const movieRating = getMovieRatings(movie);
      return `${movieRating ? `${movie.Title} ${movieRating}` : movie.Title}`;
    });
  };

  removies = (): void => {
    this.movies = [];
  };

  removie = (id: number): string | undefined => {
    const zeroizedIndex = id - 1;
    const movie = this.movies[zeroizedIndex];

    const newMovieArray = this.movies.filter(
      (_, index) => index !== zeroizedIndex
    );

    this.movies = newMovieArray;

    if (movie) {
      return movie.Title;
    }
  };

  makeUnique = (): void => {
    const uniqueMovies: Set<Movie> = new Set();
    const uniqueMovieIds: Set<string> = new Set();

    for (const movie of this.movies) {
      if (movie.imdbID) {
        uniqueMovieIds.add(movie.imdbID);
      } else {
        uniqueMovies.add(movie);
      }
    }

    uniqueMovieIds.forEach((uniqueMovieId) => {
      const movieFromId = this.movies.find(
        (movie) => movie.imdbID === uniqueMovieId
      );

      if (movieFromId) uniqueMovies.add(movieFromId);
    });

    this.movies = Array.from(uniqueMovies);
  };
}
