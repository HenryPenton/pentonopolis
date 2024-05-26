import { removeFromArray } from "./removeFromArray";

describe("remove from array", () => {
  test("it removes an element from an array of one", () => {
    const arrayPreRemoval = ["a"];
    const arrayPostRemoval = removeFromArray<string>(arrayPreRemoval, "a");

    expect(arrayPostRemoval).toEqual([]);
  });

  test("it removes an element from an array of two", () => {
    const arrayPreRemoval = ["a", "b"];
    const arrayPostRemoval = removeFromArray<string>(arrayPreRemoval, "a");

    expect(arrayPostRemoval).toEqual(["b"]);
  });
});
