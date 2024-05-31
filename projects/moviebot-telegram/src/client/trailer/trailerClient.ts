export interface TrailerClient {
  getTrailer: (movieName: string) => Promise<string>;
}
