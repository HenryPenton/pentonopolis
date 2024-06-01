import { stripCommand } from "./commandParser";

describe("strip command", () => {
  test("it strips the command from an otherwise empty string", () => {
    const x = stripCommand("/abc");

    expect(x).toEqual("");
  });

  test("it strips the command from a string with another word in it", () => {
    const x = stripCommand("/abc xyz");

    expect(x).toEqual("xyz");
  });

  test("it strips the command from a string with other words in it", () => {
    const x = stripCommand("/abc xyz qfp");

    expect(x).toEqual("xyz qfp");
  });
});
