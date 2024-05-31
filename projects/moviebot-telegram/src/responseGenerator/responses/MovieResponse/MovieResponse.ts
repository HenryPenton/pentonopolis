import { MovieClient, Rating } from "../../../client/movie/movieClient";
import { SearchType } from "../../../commands";
import { getTrailer } from "../../../fetcher/trailer/trailerFetcher";
import { AsyncMovieResponse } from "../AsyncMovieResponse";

export class MovieResponse extends AsyncMovieResponse {
  constructor(
    queryString: string,
    searchType: SearchType,
    movieClient: MovieClient
  ) {
    super(queryString, searchType, movieClient);
    this.queryString = queryString;
  }

  private getPlot = (plot?: string): string => (plot ? `Plot: ${plot}` : "");

  private getDirector = (director?: string): string =>
    director ? `Director: ${director}` : "";

  private getRuntime = (runtime?: string): string =>
    runtime ? `Runtime: ${runtime}` : "";

  private getTitleAndYear = (title?: string, year?: string): string => {
    const movieYear = year;
    const movieTitle = movieYear
      ? `Movie: ${title} (${year})`
      : `Movie: ${title}`;

    return movieTitle;
  };

  private getRatings = (ratings?: Rating[]): string => {
    let allRatings = "";
    if (ratings) {
      ratings.forEach((rating, index) => {
        allRatings = `${allRatings}${index === 0 ? "" : "\n"}${
          rating.Source
        }: ${rating.Value}`;
      });
    }
    return allRatings;
  };

  private combineKnownInformation = (infoArray: string[]): string => {
    let info = "";
    infoArray.forEach((element, index) => {
      if (index === 0) {
        info = element;
      } else if (element !== "") {
        info = `${info}\n\n${element}`;
      }
    });

    return info;
  };

  fire = async (): Promise<string> => {
    try {
      const movie = await this.getMovie();

      if (movie.Response === "False" || movie.Title === undefined)
        return "Unknown movie";

      const titleAndYear = this.getTitleAndYear(movie.Title, movie.Year);

      const movieDetails: string[] = [
        titleAndYear,
        this.getRuntime(movie.Runtime),
        this.getRatings(movie.Ratings),
        this.getDirector(movie.Director),
        this.getPlot(movie.Plot),
        await getTrailer(titleAndYear)
      ];

      return this.combineKnownInformation(movieDetails);
    } catch (e) {
      return this.generateErrorReponse(e);
    }
  };
}
