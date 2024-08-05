export type Predicate<T> = (value: T, index: number, array: T[]) => boolean;

export const filterSplit = <T>(
  array: T[],
  predicate: Predicate<T>
): { matchingFilter: T[]; nonMatchingFilter: T[] } => {
  const matchingFilter = array.filter(predicate);
  const nonMatchingFilter = array.filter((x) => !matchingFilter.includes(x));
  return { matchingFilter, nonMatchingFilter };
};
