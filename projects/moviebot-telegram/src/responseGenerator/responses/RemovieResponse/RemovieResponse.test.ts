import { State } from "../../../State/State";
import { RemovieResponse } from "./RemovieResponse";

describe("RemovieResponse", () => {
  test("responds that it cannot remove a movie that is not in the selection", () => {
    const state = new State();
    expect(
      new RemovieResponse(state, "barry goes to hollywood").fire()
    ).toEqual(`Couldn't find that film in the selection`);
  });

  test("remove a movie by human id (1 indexed), but its not in the state", () => {
    const state = new State();
    state.setMovie({ Title: "barry goes to hollywood" });

    expect(new RemovieResponse(state, "5").fire()).toEqual(
      `Couldn't find that film in the selection`
    );
  });

  test("remove a movie by human id (1 indexed)", () => {
    const state = new State();
    state.setMovie({ Title: "barry goes to hollywood" });

    expect(new RemovieResponse(state, "1").fire()).toEqual(
      `barry goes to hollywood removed from the selection`
    );
  });

  test("remove a movie by name", () => {
    const state = new State();
    state.setMovie({ Title: "barry goes to hollywood" });

    expect(
      new RemovieResponse(state, "barry goes to hollywood").fire()
    ).toEqual(`barry goes to hollywood removed from the selection`);
  });

  test("remove a movie not in the state by name", () => {
    const state = new State();

    expect(
      new RemovieResponse(state, "barry goes to hollywood").fire()
    ).toEqual(`Couldn't find that film in the selection`);
  });

  test("remove a movie by partial name", () => {
    const state = new State();
    state.setMovie({ Title: "barry goes to hollywood" });

    expect(new RemovieResponse(state, "barry goes").fire()).toEqual(
      `barry goes to hollywood removed from the selection`
    );
  });

  test("attempts to remove a non existent film from state", () => {
    const state = new State();

    expect(
      new RemovieResponse(state, "barry goes to hollywood").fire()
    ).toEqual(`Couldn't find that film in the selection`);
  });
});
