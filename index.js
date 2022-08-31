import { Client, Collection, GatewayIntentBits } from "discord.js";
import dotenv from 'dotenv';
import fs from 'node:fs';
import { dirname } from "./local.js";

dotenv.config();
const { TOKEN: token } = process.env;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commandFiles = fs.readdirSync(`${dirname}/commands`).filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync(`${dirname}/events`).filter(file => file.endsWith('.js'));

commandFiles.forEach(async file => {
    const { command } = await import(`${dirname}/commands/${file}`);
    client.commands.set(command.data.name, command);
});

eventFiles.forEach(async file => {
    const { event } = await import(`${dirname}/events/${file}`)

    if (event.once) client.once(event.name, (...args) => event.execute(...args));
    else client.on(event.name, async (...args) => await event.execute(...args));
});

client.login(token);
