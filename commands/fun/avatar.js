const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "avatar",
    aliases: ['pp'],
    description: "Display a avatar",
    usage: '[@user]',
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
        const member = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
        const avatar = member.displayAvatarURL({ dynamic: true , size: 2048 , format: "jpeg" })

        const embed = new MessageEmbed()
        .setTitle(`Avatar from ${member.tag}`)
        .setImage(avatar)
        .setColor(message.guild.me.displayHexColor)

        message.channel.send({embeds: [embed]})
    },
};