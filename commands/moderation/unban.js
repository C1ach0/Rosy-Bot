const {
    Message,
    Client,
    MessageEmbed,
    Permissions
} = require("discord.js");
const { QuickDB } = require('quick.db');

module.exports = {
    name: "unban",
    aliases: ['deban'],
    cooldowns: 3000,
    description: "Unban a member from a guild",
    usage: "<member ID>",
    toggleOff: false,
    developersOnly: false,
    userpermissions: ["BAN_MEMBERS"],
    botpermissions: ["BAN_MEMBERS"],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const db = new QuickDB({ 'table': `Guild_${message.guildId}`}); 

        const Lang = await db.get(`Language`)

        const NotPerm = client.lang["translations"]["MODERATION"]["UNBAN"]["Not-Perms"][Lang || "en"]
        const MentionMemberId = client.lang["translations"]["MODERATION"]["UNBAN"]["MentionMemberId"][Lang || "en"]
        const SuccesUnBan = client.lang["translations"]["MODERATION"]["UNBAN"]["SuccesUnBan"][Lang || "en"]

        // Commands

        if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.reply(NotPerm)

        const targetId = args[0]

        if (!targetId) return message.reply(MentionMemberId)
        

        message.guild.members.unban(targetId).catch(err => console.log())
        message.channel.send(SuccesUnBan)

    },
};