const {
    Message,
    Client,
    MessageEmbed,
    Permissions
} = require("discord.js");

module.exports = {
    name: "clearqueue",
    aliases: ['clsqueue', 'clslist'],
    cooldowns: 3000,
    description: "Clear a queue",
    usage: "",
    toggleOff: false,
    developersOnly: false,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botpermissions: ["ADMINISTRATOR"],

    run: async (client, message, args) => {
        client.player.getQueue(message.guild.id).shuffle();
        message.channel.send('All music from the list have been removed')
    },
};