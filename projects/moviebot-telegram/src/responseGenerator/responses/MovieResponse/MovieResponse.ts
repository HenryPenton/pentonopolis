import { Movie, MovieClient, Rating } from "../../../client/movie/movieClient";
import { TrailerClient } from "../../../client/trailer/trailerClient";
import { SearchType } from "../../../commands";
import { AsyncMovieResponse } from "../AsyncMovieResponse";

export class MovieResponse extends AsyncMovieResponse {
  constructor(
    queryString: string,
    searchType: SearchType,
    movieClient: MovieClient,
    private readonly trailerClient?: TrailerClient
  ) {
    super(queryString, searchType, movieClient);
    this.queryString = queryString;
  }

  private getPlot = (plot: string): string => `Plot: ${plot}`;
  private getDirector = (director: string): string => `Director: ${director}`;
  private getRuntime = (runtime: string): string => `Runtime: ${runtime}`;

  private getTitleAndYear = (title?: string, year?: string): string => {
    const movieTitle = year ? `Movie: ${title} (${year})` : `Movie: ${title}`;

    return movieTitle;
  };

  private getRatings = (ratings: Rating[]): string => {
    let allRatings = "";

    ratings.forEach((rating, index) => {
      allRatings = `${allRatings}${index === 0 ? "" : "\n"}${
        rating.Source
      }: ${rating.Value}`;
    });

    return allRatings;
  };

  private combineKnownInformation = (infoArray: string[]): string =>
    infoArray.join("\n\n");

  private getMovieDetails = async (movie: Movie): Promise<string[]> => {
    const titleAndYear = this.getTitleAndYear(movie.Title, movie.Year);

    const movieDetails: string[] = [titleAndYear];
    if (movie.Runtime) movieDetails.push(this.getRuntime(movie.Runtime));
    if (movie.Ratings) movieDetails.push(this.getRatings(movie.Ratings));
    if (movie.Director) movieDetails.push(this.getDirector(movie.Director));
    if (movie.Plot) movieDetails.push(this.getPlot(movie.Plot));

    if (this.trailerClient)
      movieDetails.push(await this.trailerClient.getTrailer(titleAndYear));

    return movieDetails;
  };

  fire = async (): Promise<string> => {
    try {
      const movie = await this.getMovie();

      if (movie.Title === undefined) return "Unknown movie";
      const movieDetails = await this.getMovieDetails(movie);

      return this.combineKnownInformation(movieDetails);
    } catch (e) {
      return this.generateErrorReponse(e);
    }
  };
}
