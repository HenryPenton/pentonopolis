import { getDummyConfig } from "../config/dummy_config/dummyConfig";
import { IFetch, TelegramClient } from "./telegramClient";
describe("Telegram Client", () => {
  test("sends message to telegram", () => {
    const stubFetch: IFetch = jest.fn();
    const dummyConfig = getDummyConfig({
      TELEGRAM_API_URL: "https://telegram-endpoint.com",
      TELEGRAM_CHAT_ID: "telegram-chat-id",
      TELEGRAM_BOT_TOKEN: "telegram-bot-token"
    });
    const telegramClient = new TelegramClient(stubFetch, dummyConfig);

    telegramClient.sendMessage("some message");

    expect(stubFetch).toHaveBeenCalledWith(
      "https://telegram-endpoint.com/bottelegram-bot-token/sendMessage",
      {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: '{"chat_id":"telegram-chat-id","text":"some message"}'
      }
    );
  });
});
