const {
    Message,
    Client,
    MessageEmbed,
    Permissions
} = require("discord.js");
const db = require('quick.db')
const { GuessThePokemon } = require('discord-gamecord')

module.exports = {
    name: "guessthepokemon",
    aliases: ['gtp'],
    description: 'Find the right pokemon',
    usage: '',
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
        new GuessThePokemon({
          message: message,
          slash_command: false,
          embed: {
            title: 'Who\'s This Pokemon?',
            footer: 'You have only 1 chance',
            color: '#5865F2',
          },
          time: 60000,
          thinkMessage: '**Thinking...**',
          winMessage: 'Nice! The pokemon was **{pokemon}**',
          stopMessage: 'Better luck next time! It was a **{pokemon}**',
          incorrectMessage: 'Nope! The pokemon was **{pokemon}**',
        }).startGame();
    },
};