const {
    Message,
    Client,
    MessageEmbed
} = require("discord.js");
const moment = require('moment')

module.exports = {
    name: "userinfo",
    aliases: ["ui"],
    cooldowns: 3000,
    description: "See the information of the user",
    usage: "[user]",
    toggleOff: false,
    developersOnly: false,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botpermissions: [""],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member

        const roles = member.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(role => role.toString())
            .slice(0, -1);

        const userinfo = new MessageEmbed()
            .setColor(member.displayHexColor || 'ORANGE')
            .setThumbnail(member.user.displayAvatarURL({
                dynamic: true
            }))
            .setTitle('User Info')
            .setDescription(`
            __**User**__
            **Name :** \`${member.user.username}\`
            **Tag :** \`${member.user.discriminator}\`
            **ID :** \`${member.id}\`
            **Account created the :** \`${moment(member.user.createdTimestamp).format('DD/MM/YYYY, hh:mm')}\`
            \n
            __**Member**__
            **Joins the :** \`${moment(member.joinedAt).format('DD/MM/YYYY, hh:mm')}\`
            **Pseudo :** \`${member.nickname || '❌'}\`
            **The highest role :** \`${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}\`
            **Roles :** \`${roles.length}\`
            ${roles.join(', ') || 'None'}
            `)
            .setFooter(message.member.displayName, message.author.displayAvatarURL({
                dynamic: true
            }))
            .setTimestamp()
        return message.channel.send({
            embeds: [userinfo]
        })

    }

};