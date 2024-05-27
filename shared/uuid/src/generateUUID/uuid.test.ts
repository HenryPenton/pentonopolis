import { generateNewId } from "./uuid";

describe("uuid", () => {
  describe("vanilla", () => {
    test("the ids are unique", () => {
      expect(generateNewId()).not.toEqual(generateNewId());
    });

    test("the ids are strings", () => {
      expect(generateNewId()).toEqual(expect.any(String));
    });

    test("the uuids are the right length", () => {
      expect(generateNewId()).toHaveLength(36);
      expect(generateNewId(true)).toHaveLength(36);
    });
  });

  describe("no dashes", () => {
    test("the uuids are strings", () => {
      expect(generateNewId(false)).toEqual(expect.any(String));
    });
    test("the uuids are unique", () => {
      expect(generateNewId(false)).not.toEqual(generateNewId(false));
    });
    test("the uuids are the right length", () => {
      expect(generateNewId(false)).toHaveLength(32);
    });
  });
});
