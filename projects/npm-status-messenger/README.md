# NPM Status Messenger

![Monorepo Build](https://github.com/HenryPenton/pentonopolis/actions/workflows/CI.yml/badge.svg)
![Continuous Deploy](https://github.com/HenryPenton/pentonopolis/actions/workflows/CD.yml/badge.svg)

This package will allow you to send parsed data about the output of npm audit/outdated to a chat with a telegram bot.

Start by writing out the audit or outdated data to a file

```javascript
pnpm outdated --json > outdated.json
pnpm audit --json > audit.json
```

You can then run this package from the command line, so long as you have the following environment variables set:

```bash
TELEGRAM_API_URL
TELEGRAM_CHAT_ID
TELEGRAM_BOT_TOKEN
```

To send the audit message, run:

`pnpx npm-status-messenger --audit path/to/audit.json packageName`

To send the outdated message, run:

`pnpx npm-status-messenger --outdated path/to/outdated.json packageName`
