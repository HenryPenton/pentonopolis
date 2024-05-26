import { generateNewId } from "ids";
import { generateRandomStrings } from "./generator";

describe("random strings", () => {
  test("generates one random string", () => {
    const randomStrings = generateRandomStrings(1, () => generateNewId(false));
    expect(randomStrings.size).toBe(1);
  });

  test("generates two random strings", () => {
    const randomStrings = generateRandomStrings(2, () => generateNewId(false));
    expect(randomStrings.size).toBe(2);
  });

  test("generates more random strings", () => {
    const randomStrings = generateRandomStrings(27, () => generateNewId(false));
    expect(randomStrings.size).toBe(27);
  });
});
