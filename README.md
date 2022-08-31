# discord-todo-bot

A Simple TODO list program in the form of a Discord bot

## Tools
- [Nodejs latest LTS version](https://nodejs.org/en/)
- [discord.js library](https://www.npmjs.com/package/discord.js)

## Setup
1. Create your discord application [here](https://discord.com/developers/applications). Copy the token and application id as client id.
2. Invite your bot into your server in the menu 0Auth2 > URL Generator, make sure checklist these scopes:
   - bot: Send Messages
   - applications.commands
3. Clone this repo, `git clone https://github.com/stackpan/discord-todo-bot`.
4. Cd this repo folder in your local computer, rename or copy `.env.example` to `.env`.
5. Open file `.env`, paste your token and client id into this file.
6. Install the dependencies using `npm install`.
7. Run this project using `npm run start`

## Changelog

*Aug 30, 2022*
### v1.1.0
- New command: `/todo done`. This command is to allow user to mark done their TODO list. The marked list will be displayed in strikethrough.
- Change interaction language from Bahasa to English.
- Add text styles to decorate the embed.
- Add some emojis in all interactions and embed to make it clearer and easy to read for user.

### v1.1.1
- Fix new line in todo list embed.
