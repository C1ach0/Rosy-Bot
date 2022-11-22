const {
    Message,
    Client,
    MessageEmbed,
    Permissions
} = require("discord.js");
const db = require('quick.db')

module.exports = {
    name: "roulette",
    aliases: ['russian-roulette'],
    description: 'Russian roulette',
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
        let randomPer = message.guild.members.cache.random().user;
        if(!args[0]) return message.reply('Please speacify a text!`')

        message.channel.send(`**${message.author.username}** ${args.join(' ')} ${randomPer} <:issou_54:899018772671787008>`)
    },
};