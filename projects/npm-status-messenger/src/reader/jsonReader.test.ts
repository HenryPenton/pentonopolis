import { InvalidDataError, NoDataAvailableError } from "../errors/dataErrors";
import { IValidator } from "../validator/validator";
import { JSONReader } from "./jsonReader";

type TestType = { abc: string };
describe("JSON Reader", () => {
  const validTestObject: TestType = {
    abc: "something"
  };

  test("reader returns data if validator returns valid", () => {
    const dummyReaderFileSync = jest
      .fn()
      .mockReturnValue(JSON.stringify(validTestObject));

    const dummyValidator: IValidator<TestType> = {
      validate: jest.fn().mockReturnValue(validTestObject)
    };

    const reader = new JSONReader<TestType>(
      dummyReaderFileSync,
      dummyValidator
    );

    const data = reader.read("path/to/file");
    expect(data).toEqual({
      abc: "something"
    });
    expect(dummyReaderFileSync).toHaveBeenCalledWith("path/to/file", "utf-8");
  });

  test("reader throws a no data available error if validator returns not valid", () => {
    const dummyReaderFileSync = jest
      .fn()
      .mockReturnValue(JSON.stringify(validTestObject));

    const dummyValidator: IValidator<TestType> = {
      validate: () => {
        throw new InvalidDataError("whatever reason");
      }
    };

    const reader = new JSONReader<TestType>(
      dummyReaderFileSync,
      dummyValidator
    );

    const attemptdata = (): TestType => reader.read("path/to/file");
    expect(attemptdata).toThrow(NoDataAvailableError);
  });
});
