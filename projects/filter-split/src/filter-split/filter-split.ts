export type Predicate<T> = (value: T, index: number, array: T[]) => boolean;

export const filterSplit = <T>(
  array: T[],
  predicate: Predicate<T>
): { matchingFilter: T[]; nonMatchingFilter: T[] } => {
  //this is definitely not the quickest way to do this - consider changing to array reducer?
  const matchingFilter = array.filter(predicate);
  const nonMatchingFilter = array.filter((x) => !matchingFilter.includes(x));

  return { matchingFilter, nonMatchingFilter };
};
