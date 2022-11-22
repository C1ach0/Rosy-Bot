const {
    Message,
    Client,
    MessageEmbed,
    Permissions
} = require("discord.js");
const moment = require('moment')

module.exports = {
    name: "roleinfo",
    cooldowns: 3000,
    description: "Show information from the role",
    usage: "<role>",
    toggleOff: false,
    developersOnly: false,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botpermissions: ["MANAGE_ROLES"],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
        if(!role) return message.reply('Please mention a valid role!')

        // console.log(role)
        // console.log(role.hoist)
        // console.log(role.name)
        // console.log(role.id)
        // console.log(role.mentionable)
        // console.log(role.permissions)

        let embed = new MessageEmbed()
        .setColor(role.hexColor || message.guild.me.displayHexColor)
        .setTitle('Role Information')
        .addFields(
            {name: 'Role Name', value: `**${role.name}**`, inline: true},
            {name: 'Identifiant', value: `**${role.id}**`, inline: true},
            {name: 'Color', value: `**${role.hexColor}**`, inline: true},
            {name: 'Hoist', value: `**${ role.hoist == false ? '❌' : '✔' }**`, inline: true},
            {name: 'Mentionable', value: `**${ role.mentionable == false ? '❌' : '✔' }**`, inline: true},
            {name: 'Position', value: `**${role.position}**`, inline: true}
        )
        .addField('Created AT :', `**${moment(role.createdTimestamp).format('DD/MM/YYYY, hh:mm')}**`)
        .addField('Member with this role', `**${role.members.size}**`)
        message.channel.send({embeds: [embed]})
    },
};