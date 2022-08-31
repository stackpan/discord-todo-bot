import { REST } from '@discordjs/rest';
import { Routes } from 'discord.js';
import dotenv from 'dotenv';
import fs from 'node:fs';
import { dirname } from "../local.js";

dotenv.config({ path: `${dirname}/.env` });
const { TOKEN: token, CLIENT_ID: clientId } = process.env;

const commands = [];
const commandFiles = fs.readdirSync(`${dirname}/commands/`).filter(file => file.endsWith('.js'));

commandFiles.forEach(async file => {
    const { command } = await import(`${dirname}/commands/${file}`);
    commands.push(command.data.toJSON());
});

const rest = new REST({ version: 10 }).setToken(token);

rest.put(Routes.applicationCommands(clientId), { body: commands })
    .then(data => console.log(`Successfully reloaded application (/) commands. ${data.length} commands registered.`))
    .catch(console.error);
