export const event = {
    name: 'ready',
    once: true,
    execute(client) {
        console.info(`Ready logged in as ${client.user.tag}`);
    },
};