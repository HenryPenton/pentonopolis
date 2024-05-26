import { Config } from "../config";
import { Protection } from "../protection/protection";
import { generateNewId } from "../utils/generateUUID/uuid";
import { punctuationRemover } from "../utils/punctuation/punctuation";

export const getSentenceComponents = (
  text: string,
  config: Config
): string[] => {
  const { protectionList } = config;
  const protection = new Protection(protectionList, () => generateNewId(false));
  let content = text;

  content = protection.addWordProtection(content);

  const sentenceComponents = punctuationRemover(content, config).split(" ");
  const unprotectedSentenceComponents = [];
  for (const sentenceComponent of sentenceComponents) {
    unprotectedSentenceComponents.push(
      protection.removeWordProtection(sentenceComponent)
    );
  }

  return unprotectedSentenceComponents.filter((component) => component !== "");
};

export const getUniqueSentenceComponents = (
  text: string,
  config: Config
): Set<string> => {
  return new Set(getSentenceComponents(text, config));
};
