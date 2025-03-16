import { readFileSync, writeFileSync } from "fs";

export interface IFileClient<T> {
  read: (filepath: string) => T;
  write: (filepath: string, data: T) => void;
}

export type IFileReader = typeof readFileSync;
export type IFileWriter = typeof writeFileSync;
