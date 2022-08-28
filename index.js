const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('node:fs');
const { token } = require('./config');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

commandFiles.forEach(file => {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
});

eventFiles.forEach(file => {
    const event = require(`./events/${file}`);

    if (event.once) client.once(event.name, (...args) => event.execute(...args));
    else client.on(event.name, async (...args) => await event.execute(...args));
});

client.login(token);
