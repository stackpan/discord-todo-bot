export const event = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) return;
        try {
            await command.execute(interaction);
        } catch (err) {
            console.error(err);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        } finally {
            console.log(`${interaction.user.tag} in ${interaction.channel.name} triggered an interaction.`);
        }
    }
}