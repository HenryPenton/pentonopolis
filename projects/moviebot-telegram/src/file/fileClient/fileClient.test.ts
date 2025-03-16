import { IFileClient, IFileReader, IFileWriter } from "../file";
import { FileClient } from "./fileClient";

type TestObject = { someKey: string };

describe("client", () => {
  describe("read", () => {
    test("the reader returns the string from a file", () => {
      const dummyWriter: IFileWriter = jest.fn();
      const dummyReader: IFileReader = jest
        .fn()
        .mockReturnValue('{"someKey":"someValue"}');
      const fileClient: IFileClient<TestObject> = new FileClient(
        dummyReader,
        dummyWriter
      );
      expect(fileClient.read("file")).toEqual({ someKey: "someValue" });
    });
  });

  describe("write", () => {
    test("the writer writes to the file", () => {
      const dummyReader: IFileReader = jest.fn();
      const dummyWriter: IFileWriter = jest
        .fn()
        .mockReturnValue("some file content");
      const fileClient: IFileClient<TestObject> = new FileClient(
        dummyReader,
        dummyWriter
      );
      const testObjectToWrite: TestObject = {
        someKey: "someValue"
      };

      fileClient.write("file", testObjectToWrite);

      expect(dummyWriter).toHaveBeenCalledWith(
        "file",
        JSON.stringify(testObjectToWrite)
      );
      expect(dummyWriter).toHaveBeenCalledTimes(1);
    });
  });
});
