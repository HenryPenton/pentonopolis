import { Configuration } from "config-captain";
import { IConfig } from "../../startup";

type Overrides = { [key: string]: string };
export const getDummyConfig = (overrides: Overrides = {}): IConfig => {
  const dummyConfig: IConfig = new Configuration(
    {},
    {
      telegramApiUrl: "TELEGRAM_API_URL",
      telegramChatId: "TELEGRAM_CHAT_ID",
      telegramBotToken: "TELEGRAM_BOT_TOKEN"
    },
    [
      {
        TELEGRAM_API_URL: "dummy-url",
        TELEGRAM_CHAT_ID: "dummy-chat-id",
        TELEGRAM_BOT_TOKEN: "dummy-bot-token",
        ...overrides
      }
    ]
  );

  return dummyConfig;
};
