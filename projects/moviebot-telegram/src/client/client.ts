import { Movie } from "../fetcher/movie/movieFetcher";

const splitter = (queryString: string): string[] => queryString.split(" ");
const joiner = (splitString: string[]): string => splitString.join("%20");

interface Client {
  getMovie: (queryString: string) => Promise<Movie>;
  //   getMovieWithYear: () => Movie;
  //   getMovieWithID: () => Movie;
}

export type Fetch = typeof fetch;

export class OMDBClient implements Client {
  constructor(private readonly fetch: Fetch) {}

  getMovie = async (queryString: string): Promise<Movie> => {
    const splitQuery = splitter(queryString);
    const urlQueryString = joiner(splitQuery);

    try {
      const response = await this.fetch(
        `http://www.omdbapi.com/?t=${urlQueryString}&apikey=${process.env.MOVIE_DATABASE_KEY}`
      );

      const movie = (await response.json()) as Movie;

      return movie;
    } catch (e) {
      return { Response: "False" };
    }
  };

  //   getMovieWithYear = () => {};
  //   getMovieWithID = () => {};
}
