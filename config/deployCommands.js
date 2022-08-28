const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const fs = require('node:fs');
const { token, clientId } = require('../config');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

commandFiles.forEach(file => {
    const command = require(`../commands/${file}`);
    commands.push(command.data.toJSON());
});

const rest = new REST({ version: 10 }).setToken(token);

(async () => {
    try {
        console.info('Started refreshing (/) application commands');

        await rest.put(Routes.applicationCommands(clientId), { body: commands });

        console.info('Successfully reloaded aplication (/) commands');
    } catch (err) {
        console.error(err);
    }
})();
