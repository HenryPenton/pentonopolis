import { InvalidDataError } from "../../errors/dataErrors";
import { OutdatedData } from "../../services/outdated/outdated";
import { NpmOutdatedValidator } from "./NPMOutdatedValidator";
describe("outdated validator", () => {
  test("returns the data if valid for a single dependency", () => {
    const outdatedValidator = new NpmOutdatedValidator();

    const validData = outdatedValidator.validate({
      aaaa: { current: "1.2.3", latest: "2.3.4" }
    });

    const expectedValidData: OutdatedData = {
      aaaa: { current: "1.2.3", latest: "2.3.4" }
    };

    expect(validData).toEqual(expectedValidData);
  });

  test("missing current version", () => {
    const outdatedValidator = new NpmOutdatedValidator();

    const validationAttempt = (): OutdatedData =>
      outdatedValidator.validate({
        aaaa: { latest: "2.3.4" }
      });

    expect(validationAttempt).toThrow(
      new InvalidDataError("Invalid outdated data")
    );
  });

  test("missing latest version", () => {
    const outdatedValidator = new NpmOutdatedValidator();

    const validationAttempt = (): OutdatedData =>
      outdatedValidator.validate({
        aaaa: { current: "2.3.4" }
      });

    expect(validationAttempt).toThrow(
      new InvalidDataError("Invalid outdated data")
    );
  });

  test("returns the data if valid for two dependencies", () => {
    const outdatedValidator = new NpmOutdatedValidator();

    const validData = outdatedValidator.validate({
      aaaa: { current: "1.2.3", latest: "2.3.4" },
      bbbb: { current: "4.5.6", latest: "5.6.7" }
    });

    const expectedValidData: OutdatedData = {
      aaaa: { current: "1.2.3", latest: "2.3.4" },
      bbbb: { current: "4.5.6", latest: "5.6.7" }
    };

    expect(validData).toEqual(expectedValidData);
  });

  test("throws an Invalid Data Error if the object data is not valid", () => {
    const outdatedValidator = new NpmOutdatedValidator();

    const validationAttempt = (): OutdatedData =>
      outdatedValidator.validate({
        aaaa: { current: "1.2.3", latest: "2.3.4" },
        aaalflfa: "",
        bbbb: { current: "4.5.6", latest: "5.6.7" }
      });

    expect(validationAttempt).toThrow(
      new InvalidDataError("Invalid outdated data")
    );
  });
  test("throws an Invalid Data Error if the object is actually a string", () => {
    const outdatedValidator = new NpmOutdatedValidator();

    const validationAttempt = (): OutdatedData =>
      outdatedValidator.validate("wrong");

    expect(validationAttempt).toThrow(
      new InvalidDataError("Invalid outdated data")
    );
  });

  test("throws an Invalid Data Error if the object is actually a number", () => {
    const outdatedValidator = new NpmOutdatedValidator();

    const validationAttempt = (): OutdatedData => outdatedValidator.validate(2);

    expect(validationAttempt).toThrow(
      new InvalidDataError("Invalid outdated data")
    );
  });
});
