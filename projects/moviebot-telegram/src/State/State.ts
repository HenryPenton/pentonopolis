import { PollOption } from "telegraf/typings/core/types/typegram";
import { Movie } from "../fetcher/movie/movieFetcher";
import { getMovieRatings } from "../utils/getMovieRatings";
import { removeFromArray } from "../utils/removeFromArray";

export type MoviePollId = string;

export class State {
  private movies: Movie[];
  private polls: PollOption[];

  constructor() {
    this.movies = [];
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
    const uniqueMovies: Movie[] = [];
    const uniqueMovieTitles: string[] = [];

    this.movies.forEach((movie) => {
      if (movie.imdbID) {
        if (!uniqueMovieTitles.includes(movie.imdbID)) {
          uniqueMovies.push(movie);
          uniqueMovieTitles.push(movie.imdbID);
        }
      } else {
        uniqueMovies.push(movie);
      }
    });

    this.movies = uniqueMovies;
  };
}
