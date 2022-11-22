const {
    Message,
    Client,
    MessageEmbed,
    Permissions
} = require("discord.js");
const { QuickDB } = require('quick.db');

module.exports = {
    name: "say",
    aliases: ['print'],
    cooldowns: 3000,
    description: "Says your message",
    usage: "<text>",
    toggleOff: false,
    developersOnly: false,
    userpermissions: ["MANAGE_MESSAGES"],
    botpermissions: ["MANAGE_MESSAGES"],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const text = args.join(' ')
        try {
            message.delete()
        } catch (error) {}
        message.channel.send(text)
    },
};