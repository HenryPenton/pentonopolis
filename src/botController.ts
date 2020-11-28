import { generateResponse } from "./messageHandler/messageHandler";
import { IncomingMessage } from "./types";

const TG = require("telegram-bot-api");

export const init = () => {
  const api = new TG({
    token: process.env.TELEGRAM_BOT_TOKEN,
  });

  const mp = new TG.GetUpdateMessageProvider();

  api.setMessageProvider(mp);

  api
    .start()
    .then(() => {
      console.log("API is started");
    })
    .catch((err: string) => console.error(err));

  api.on("update", async (update: IncomingMessage) => {
    generateResponse(update, api);
  });
};
