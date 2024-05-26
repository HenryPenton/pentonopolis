import { v4 as newUUID } from "uuid";

export const generateNewId = (withDashes: boolean = true): string => {
  return withDashes ? newUUID() : newUUID().replaceAll("-", "");
};
