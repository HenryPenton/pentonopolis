import { IConfig } from "../startup";
import { IClient } from "./client";

export type IFetch = typeof fetch;

export class TelegramClient implements IClient {
  constructor(
    private fetch: IFetch,
    private config: IConfig
  ) {}

  sendMessage = async (message: string): Promise<void> => {
    const { telegramApiUrl, telegramChatId, telegramBotToken } =
      this.config.getConfigurationVariables();

    const sendMessageUrl = new URL(
      `/bot${telegramBotToken}/sendMessage`,
      `${telegramApiUrl}`
    );

    this.fetch(sendMessageUrl.toString(), {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ chat_id: telegramChatId, text: message }),
      method: "POST"
    });
  };
}
