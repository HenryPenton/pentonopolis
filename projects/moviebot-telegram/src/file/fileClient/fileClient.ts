import { IFileClient, IFileReader, IFileWriter } from "../file";

export class FileClient<T> implements IFileClient<T> {
  constructor(
    private readonly fileReader: IFileReader,
    private readonly fileWriter: IFileWriter
  ) {}

  read = (filePath: string): T => {
    return JSON.parse(this.fileReader(filePath, { encoding: "utf-8" }));
  };

  write = (filePath: string, data: T): void => {
    this.fileWriter(filePath, JSON.stringify(data));
  };
}
