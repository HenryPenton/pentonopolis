import { joiner, splitter } from "./string";
describe("splitter", () => {
  test("splits round a space", () => {
    expect(splitter("this string", " ")).toEqual(["this", "string"]);
  });

  test("splits round a dot", () => {
    expect(splitter("this.string", ".")).toEqual(["this", "string"]);
  });

  test("single word not split", () => {
    expect(splitter("this", ".")).toEqual(["this"]);
  });
});

describe("joiner", () => {
  test("join round x", () => {
    expect(joiner(["a", "b"], "x")).toEqual("axb");
  });

  test("join round %20", () => {
    expect(joiner(["a", "b"], "%20")).toEqual("a%20b");
  });
});
