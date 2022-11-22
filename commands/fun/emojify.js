const {
    Message,
    Client,
    MessageEmbed,
    Permissions
} = require("discord.js");
const db = require('quick.db')
const { Emojify } = require('discord-gamecord');

module.exports = {
    name: "emojify",
    description: 'Change your text to emoji',
    usage: '<text>',
    cooldowns: 3000,
   toggleOff: false,
   developersOnly: false,
   userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
   botpermissions: ["SEND_MESSAGES", "MANAGE_WEBHOOKS"],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const Text = args.join(' ');
        
        message.channel.send(await Emojify(Text));
    },
};