import { NoDataAvailableError } from "../errors/dataErrors";
import { IValidator } from "../validator/validator";
import { ISynchronousReader, SyncReader } from "./reader";

export class JSONReader<T> implements ISynchronousReader<T> {
  constructor(
    private readonly reader: SyncReader,
    private readonly validator: IValidator<T>
  ) {}

  read = (path: string): T => {
    try {
      const dataFromFile = JSON.parse(this.reader(path, "utf-8"));
      return this.validator.validate(dataFromFile);
    } catch {
      throw new NoDataAvailableError();
    }
  };
}
