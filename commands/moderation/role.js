const {
    Message,
    Client,
    MessageEmbed,
    Permissions
} = require("discord.js");
const { QuickDB } = require('quick.db');

module.exports = {
    name: "addrole",
    cooldowns: 3000,
    description: "Give a role for a mentionned member on the server",
    usage: "<+ / -> <@user> <@role>",
    toggleOff: false,
    developersOnly: false,
    userpermissions: ["MANAGE_ROLE"],
    botpermissions: ["MANAGE_ROLE"],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let add = ["add", "+"]
        let del = ["remove", "-"]
        if (add.includes(args[0])) {
            let target = message.mentions.users.last() || message.guild.members.cache.get(args[2]) || message.author

            let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])

            if (!target) return message.channel.send(`**${message.author.username}**, please mention a user!`)

            if (!role) return message.channel.send(`**${message.author.username}**, please mention a role!`)

            message.guild.members.cache.get(target.id).roles.add(role.id)

            return message.channel.send(`${target} just received the role: ${role}`)
        } else if (del.includes(args[0])) {
            let target = message.mentions.users.last() || message.guild.members.cache.get(args[2]) || message.author

            let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])

            if (!target) return message.channel.send(`**${message.author.username}**, please mention a user!`)

            if (!role) return message.channel.send(`**${message.author.username}**, please mention a role!`)

            message.guild.members.cache.get(target.id).roles.remove(role.id)

            return message.channel.send(`${target} lost the role : ${role}`)
        }

    },
};