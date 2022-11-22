const {
    Message,
    Client,
    MessageEmbed,
    Permissions
} = require("discord.js");
const db = require('quick.db')
const { WouldYouRather } = require('discord-gamecord')

module.exports = {
    name: "wouldyourather",
    aliases: ['wya'],
    description: 'Chose your preference',
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
        new WouldYouRather({
          message: message,
          slash_command: false,
          embed: {
            title: 'Would You Rather',
            color: '#5865F2',
          },
          thinkMessage: '**Thinking...**',
          buttons: { option1: 'Option 1', option2: 'Option 2' },
          othersMessage: 'You are not allowed to use buttons for this message!',
        }).startGame();
    },
};