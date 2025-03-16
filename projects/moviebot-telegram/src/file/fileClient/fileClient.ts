import { IFileClient, IFileReader, IFileWriter } from "../file";

export class FileClient<T> implements IFileClient<T> {
  constructor(
    private readonly fileReader: IFileReader,
    private readonly fileWriter: IFileWriter
  ) {}

  read = (filePath: string): T => {
    try {
      return JSON.parse(this.fileReader(filePath, { encoding: "utf-8" }));
    } catch {
      return JSON.parse("[]");
    }
  };

  write = (filePath: string, data: T): void => {
    try {
      this.fileWriter(filePath, JSON.stringify(data));
    } catch {
      //no-op
    }
  };
}
