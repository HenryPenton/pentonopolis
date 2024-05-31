export const splitter = (input: string, delimiter: string): string[] =>
  input.split(delimiter);

export const joiner = (parts: string[], joinRound: string): string =>
  parts.join(joinRound);
