import type { Predicate } from "./filter-split";
import { filterSplit } from "./filter-split";

describe("filter split", () => {
  test("extend a regular filter", () => {
    const startArray = ["a", "b"];
    const predicate: Predicate<string> = (letter: string) => letter === "a";

    const { matchingFilter } = filterSplit(startArray, predicate);
    expect(matchingFilter).toEqual(["a"]);
  });

  test("get non matching part of filter", () => {
    const startArray = ["a", "b"];
    const predicate: Predicate<string> = (letter: string) => letter === "a";

    const { nonMatchingFilter } = filterSplit<string>(startArray, predicate);
    expect(nonMatchingFilter).toEqual(["b"]);
  });

  test("get both parts of the filter for a large array", () => {
    const startArray = ["a", "b", "c", "d", "e", "f", "g"];
    const predicate: Predicate<string> = (letter: string) => {
      return letter === "a" || letter === "c";
    };

    const { nonMatchingFilter, matchingFilter } = filterSplit<string>(
      startArray,
      predicate
    );
    expect(nonMatchingFilter).toEqual(["b", "d", "e", "f", "g"]);
    expect(matchingFilter).toEqual(["a", "c"]);
  });

  test("array that has different types in it", () => {
    const startArray = ["a", 1];
    const predicate: Predicate<string | number> = (input: string | number) => {
      return input === 1 || input === "a";
    };

    const { nonMatchingFilter, matchingFilter } = filterSplit<string | number>(
      startArray,
      predicate
    );
    expect(nonMatchingFilter).toEqual([]);
    expect(matchingFilter).toEqual(["a", 1]);
  });
});
