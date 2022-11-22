const {
    Message,
    Client,
    MessageEmbed,
    Permissions
} = require("discord.js");
const db = require('quick.db')
const {
    RockPaperScissors
} = require('discord-gamecord')

module.exports = {
    name: "rps",
    description: 'Playing th rock paper scissors with your friends',
    usage: '<@user>',
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

        new RockPaperScissors({
            message: message,
            slash_command: false,
            opponent: message.mentions.users.first() || message.guild.members.cache.get(args[0]),
            embed: {
                title: 'Rock Paper Scissors',
                description: 'Press a button below to make a choice!',
                color: '#5865F2',
            },
            buttons: {
                rock: 'Rock',
                paper: 'Paper',
                scissors: 'Scissors',
            },
            emojis: {
                rock: '🌑',
                paper: '📃',
                scissors: '✂️',
            },
            othersMessage: 'You are not allowed to use buttons for this message!',
            chooseMessage: 'You choose {emoji}!',
            noChangeMessage: 'You cannot change your selection!',
            askMessage: 'Hey {opponent}, {challenger} challenged you for a game of Rock Paper Scissors!',
            cancelMessage: 'Looks like they refused to have a game of Rock Paper Scissors. \:(',
            timeEndMessage: 'Since the opponent didnt answer, i dropped the game!',
            drawMessage: 'It was a draw!',
            winMessage: '{winner} won the game!',
            gameEndMessage: 'The game went unfinished :(',
        }).startGame();
    },
};