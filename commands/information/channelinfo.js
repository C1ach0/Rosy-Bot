const {
    Message,
    Client,
    MessageEmbed,
    Permissions
} = require("discord.js");
const moment = require('moment')

module.exports = {
    name: "channelinfo",
    cooldowns: 3000,
    description: "View information from channel",
    usage: "<channel>",
    toggleOff: false,
    developersOnly: false,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botpermissions: ["MANAGE_CHANNELS"],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
        if(!channel) return message.reply('Please mention a valid channel!')

        let embed = new MessageEmbed()
        .setColor('DARK_BLUE')
        .addFields(
            {name: `Channel Name`, value: `**${channel.name}**`, inline: true},
            {name: `Identifiant`, value: `**${channel.id}**`, inline: true},
            {name: `Parent`, value: `**${channel.parent == null ? '❌' : channel.parent}**`, inline: true},
            {name: `Type`, value: `**${channel.type == 'GUILD_TEXT' ? 'Textual' : 'Voice'}**`, inline: true},
            {name: `Sujet`, value: `**${channel.topic == null ? '❌' : channel.topic}**`, inline: true}
        )
        .addField('Created AT :', `**${moment(channel.createdTimestamp).format('DD/MM/YYYY, hh:mm')}**`)
        message.channel.send({embeds: [embed]})
    },
};