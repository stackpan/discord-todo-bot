import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import {
    getUserData,
    checkUserData,
    createTodo,
    removeTodo,
    crossTodo
} from '../handlers/handler.js';

export const command = {
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
                        .setDescription('Number index of your TODO to delete')
                        .setRequired(true)))
        .addSubcommand(subCommand =>
            subCommand
                .setName('done')
                .setDescription('Mark done your TODO')
                .addNumberOption(option =>
                    option
                        .setName('index')
                        .setDescription('Number index of your TODO to cross out')
                        .setRequired(true))),
    async execute(interaction) {
        checkUserData(interaction.user.id);

        const todoEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL()})
            .setTitle(`> ${interaction.user.username} TODO :notepad_spiral:`);

        switch (interaction.options.getSubcommand()) {
            case 'list':
                const userData = getUserData(interaction.user.id);

                if (userData.todo.length === 0) todoEmbed.setDescription('*You don\'t have a TODO* :face_with_raised_eyebrow:');
                else {
                    let description = '';

                    for (let i = 0; i < userData.todo.length; i++) {
                        const todo = userData.todo[i];
                        const contentSpace = (todo.isDone) ? `~~${todo.content}~~` : todo.content;
                        description += `**${i + 1}.** ${contentSpace}\n`;
                    }

                    todoEmbed.setDescription(description);
                }

                interaction.reply({ embeds: [todoEmbed] });
                break;
            case 'add':
                const todo = interaction.options.getString('todo');
                createTodo(interaction.user.id, todo);
                interaction.reply('Your todo was created successfully. :white_check_mark:');
                break;
            case 'remove':
                const indexRemove = interaction.options.getNumber('index');

                if (indexRemove <= 0) interaction.reply(`The index you entered is not valid! :warning:`);
                else if (indexRemove > getUserData(interaction.user.id).todo.length) interaction.reply(`You don\'t have TODO at index ${indexRemove}! :x:`);
                else {
                    removeTodo(interaction.user.id, indexRemove - 1);
                    interaction.reply('Your TODO was successfully deleted at index 2. :white_check_mark:');
                }
                break;
            case 'done':
                const indexDone = interaction.options.getNumber('index');
                if (indexDone <= 0) interaction.reply(`The index you entered is not valid! :warning:`);
                else if (indexDone > getUserData(interaction.user.id).todo.length) interaction.reply(`You don\'t have TODO at index ${indexDone}! :x:`);
                else {
                    crossTodo(interaction.user.id, indexDone - 1);
                    interaction.reply('Your TODO was successfully crossed out at index 2. :white_check_mark:');
                }
                // TODO: create crossed out TODO validator if the todo is already crossed out then tell to user;
                break;
        }
    }

}
