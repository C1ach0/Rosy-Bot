const {
    Message,
    Client,
    MessageEmbed,
    Permissions
} = require("discord.js");
const { QuickDB } = require('quick.db');

module.exports = {
    name: "kick",
    cooldowns: 3000,
    description: "Kick a member from a guild",
    usage: "<@user> [reason]",
    toggleOff: false,
    developersOnly: false,
    userpermissions: ["KICK_MEMBERS"],
    botpermissions: ["KICK_MEMBERS"],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const db = new QuickDB({ 'table': `Guild_${message.guildId}`}); 

        // Language

        const Lang = await db.get(`Language`)

        const NotPerm = client.lang["translations"]["MODERATION"]["KICK"]["Not-Perms"][Lang || "en"]
        const MentionMember = client.lang["translations"]["MODERATION"]["KICK"]["MentionMember"][Lang || "en"]
        const CannotKick = client.lang["translations"]["MODERATION"]["KICK"]["CannotKick"][Lang || "en"]
        const KickBot = client.lang["translations"]["MODERATION"]["KICK"]["KickBot"][Lang || "en"]
        const KickYourself = client.lang["translations"]["MODERATION"]["KICK"]["KickYourself"][Lang || "en"]
        const SuccesKick = client.lang["translations"]["MODERATION"]["KICK"]["SuccesKick"][Lang || "en"]
        const IDontKick = client.lang["translations"]["MODERATION"]["KICK"]["IDontKick"][Lang || "en"]


        // Commands


        if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.reply(NotPerm)

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const reason = args.slice(1).join('');
        const mod = message.author.tag;

        if (!target) return message.reply(MentionMember)
        if (target.roles.highest.position >= message.member.roles.highest.position) {
            return message.channel.send(CannotKick)
        }
        if (message.mentions.users.first().bot) return message.channel.send(KickBot)
        if (target.id === message.author.id) return message.channel.send(KickYourself)


        if (!reason) {
            const reason2 = 'Not Reason'

            if (target.kickable) {
                let embed = new MessageEmbed()
                    .setColor('RED')
                    .setDescription(`
                    ✔ \`${target.user.tag}\` ${SuccesKick}
                    \n**Reason :** \` ${reason2} \`
                    `)
                message.channel.send({
                    embeds: [embed]
                })
                await target.kick({
                    reason: `${reason2} || Kicked by : ${mod}`
                })
                //console.log(`${reason2} || Kicked by : ${mod}`)
            } else {
                return message.channel.send(IDontKick)
            }
            return;
        }

        if (target.kickable) {
            let embed = new MessageEmbed()
                .setColor('RED')
                .setDescription(`
                ✔ \`${target.user.tag}\` ${SuccesKick}
                \n**Reason :** \` ${reason} \`
                `)
            message.channel.send({
                embeds: [embed]
            })
            await target.kick({
                reason: `${reason} || Kicked by : ${mod}`
            })
            //console.log(`${reason} || Kicked by : ${mod}`)
        } else {
            return message.channel.send(IDontKick)
        }
        return

    },
};