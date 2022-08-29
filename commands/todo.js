const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const getUserData = require('../handlers/getUserData');
const checkUserData = require('../handlers/checkUserData');
const createTodo = require('../handlers/createTodo');
const removeTodo = require('../handlers/removeTodo');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('todo')
        .setDescription('TODO list manager')
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('Show your TODO list'))
        .addSubcommand(subCommand =>
            subCommand
                .setName('add')
                .setDescription('Create your TODO')
                .addStringOption(option =>
                    option
                        .setName('todo')
                        .setDescription('Your TODO')
                        .setRequired(true)))
        .addSubcommand(subCommand =>
            subCommand
                .setName('remove')
                .setDescription('Delete your TODO')
                .addNumberOption(option =>
                    option
                        .setName('index')
                        .setDescription('Number index of your TODO')
                        .setRequired(true))),
    async execute(interaction) {
        checkUserData(interaction.user.id);

        const todoEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL()})
            .setTitle(`${interaction.user.username} TODO`);

        switch (interaction.options.getSubcommand()) {
            case 'list':
                const userData = getUserData(interaction.user.id);

                if (userData.todo.length === 0) todoEmbed.setDescription('Kamu belum mempunyai TODO');
                else {
                    let description = '';

                    for (let i = 0; i < userData.todo.length; i++) {
                        description += `${i + 1}). ${userData.todo[i].content}\n`;
                    }

                    todoEmbed.setDescription(description);
                }

                interaction.reply({ embeds: [todoEmbed] });
                break;
            case 'add':
                const todo = interaction.options.getString('todo');
                createTodo(interaction.user.id, todo);
                interaction.reply('TODO kamu berhasil dibuat.');
                break;
            case 'remove':
                const index = interaction.options.getNumber('index');

                if (index <= 0) interaction.reply(`Index yang kamu masukkan tidak valid!`);
                else if (index > getUserData(interaction.user.id).todo.length) interaction.reply(`Kamu tidak mempunyai TODO di index ke-${index}!`);
                else {
                    removeTodo(interaction.user.id, index - 1);
                    interaction.reply('TODO kamu berhasil dihapus.');
                }
                break;
        }
    }

}
