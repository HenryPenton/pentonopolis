export const removeFromArray = <T>(array: T[], itemToRemove: T): T[] =>
  array.filter((x) => x !== itemToRemove);
