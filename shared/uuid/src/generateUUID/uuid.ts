import { v4 as newUUID } from "uuid";

export const generateNewId = (withDashes: boolean = true): string => {
  if (withDashes) {
    return newUUID();
  } else {
    return newUUID().replaceAll("-", "");
  }
};
