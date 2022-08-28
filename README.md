# discord-todo-bot

A Simple TODO list program in the form of a Discord bot

## Tools
- [Nodejs LTS version](https://nodejs.org/en/)
- [discord.js](https://www.npmjs.com/package/discord.js?source=post_page-----7b5fe27cb6fa----------------------)

## Setup
1. Create your discord application [here](https://discord.com/developers/applications). Copy the token and application id as client id.
2. Invite your bot into your server in the menu 0Auth2 > URL Generator, make sure checklist these scopes:
   - bot: Send Messages & Add Reaction
   - applications.commands
3. Clone this repo, `git clone https://github.com/stackpan/discord-todo-bot`.
4. Cd this repo folder in your local computer, rename or copy `config.json.template` to `config.json`.
5. Open file `config.json`, paste your token and client id into this file.
6. Install the dependencies using `npm init`.
7. Run this project using `npm run start`
