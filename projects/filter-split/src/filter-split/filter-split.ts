export type Predicate<T> = (value: T, index: number, array: T[]) => boolean;

export const filterSplit = <T>(
  array: T[],
  predicate: Predicate<T>
): { matchingFilter: T[]; nonMatchingFilter: T[] } => {
  const matchingFilter: T[] = [];
  const nonMatchingFilter: T[] = [];

  array.forEach((value, index) => {
    if (predicate(value, index, array)) {
      matchingFilter.push(value);
    } else {
      nonMatchingFilter.push(value);
    }
  });

  return { matchingFilter, nonMatchingFilter };
};
