const {
    Message,
    Client,
    MessageEmbed,
    Permissions
} = require("discord.js");
const { QuickDB } = require('quick.db');

module.exports = {
    name: "unmute",
    aliases: ['demute'],
    cooldowns: 3000,
    description: "Unmute a member from a guild",
    usage: "<@user>",
    toggleOff: false,
    developersOnly: false,
    userpermissions: ["MANAGE_MESSAGES"],
    botpermissions: ["MANAGE_MESSAGES"],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        const db = new QuickDB({ 'table': `Guild_${message.guildId}`}); 

        const Lang = await db.get(`Language`)

        const NotPerm = client.lang["translations"]["MODERATION"]["UNMUTE"]["Not-Perms"][Lang || "en"]
        const NoRoleCalled = client.lang["translations"]["MODERATION"]["UNMUTE"]["NoRoleCalled"][Lang || "en"]
        const MentionMember = client.lang["translations"]["MODERATION"]["UNMUTE"]["MentionMember"][Lang || "en"]
        const CannotUnMute = client.lang["translations"]["MODERATION"]["UNMUTE"]["CannotUnMute"][Lang || "en"]
        const SuccesUnMute = client.lang["translations"]["MODERATION"]["UNMUTE"]["SuccesUnMute"][Lang || "en"]
        const MP = client.lang["translations"]["MODERATION"]["UNMUTE"]["MP"][Lang || "en"]


        // Commands

        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.reply(NotPerm)
        const muterole = message.guild.roles.cache.find((role) => role.name === "mute");
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!muterole) return message.reply(NoRoleCalled)
        if (!target) return message.reply(MentionMember)
        if (target.roles.highest.position >= message.member.roles.highest.position) return message.reply(CannotUnMute)

        target.roles.remove(muterole).catch(err => console.log())

        let embed = new MessageEmbed()
            .setColor('ORANGE')
            .setDescription(`
            ✔ \`${target.user.tag}\` ${SuccesUnMute}
            `)
        message.channel.send({
            embeds: [embed]
        })
        target.send(`${MP} \`${message.guild.name} (${message.guild.id})\`!`)

    },
};