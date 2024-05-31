import { Movie } from "../client/client";

export const getMovieRatings = (movie: Movie): string | undefined => {
  let setMovieRating;
  if (movie.Ratings) {
    if (movie.Ratings.length > 0) {
      const firstRating = movie.Ratings[0].Source;
      const source =
        firstRating === "Internet Movie Database"
          ? "IMDb"
          : movie.Ratings[0].Source;

      setMovieRating = `(${source} Rating: ${movie.Ratings[0].Value})`;
    }
  }
  return setMovieRating;
};
