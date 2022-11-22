const {
    Message,
    Client,
    MessageEmbed,
    Permissions
} = require("discord.js");
const { QuickDB } = require('quick.db');

module.exports = {
    name: "ban",
    cooldowns: 3000,
    description: "Ban a member from a guild",
    usage: "<@user> [reason]",
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

        // // Language

        const Lang = await db.get(`Language`)

        const MentionMember = client.lang["translations"]["MODERATION"]["BAN"]["MentionMember"][Lang || "en"]
        const CannotBan = client.lang["translations"]["MODERATION"]["BAN"]["CannotBan"][Lang || "en"]
        const BanBot = client.lang["translations"]["MODERATION"]["BAN"]["BanBot"][Lang || "en"]
        const BanYourself = client.lang["translations"]["MODERATION"]["BAN"]["BanYourself"][Lang || "en"]
        const SuccesBan = client.lang["translations"]["MODERATION"]["BAN"]["SuccesBan"][Lang || "en"]
        const IDontBan = client.lang["translations"]["MODERATION"]["BAN"]["IDontBan"][Lang || "en"]

        
        // Commands

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const reason = args.slice(1).join(' ');
        const mod = message.author.tag;

        if (!target) return message.reply(MentionMember)
        if (target.roles.highest.position >= message.member.roles.highest.position) {
            return message.channel.send(CannotBan)
        }
        if (message.mentions.users.first().bot) return message.channel.send(BanBot)
        if (target.id === message.author.id) return message.channel.send(BanYourself)


        if (!reason) {
            const reason2 = 'Not Reason'

            if (target.bannable) {
                let embed = new MessageEmbed()
                    .setColor('RED')
                    .setDescription(`
                    ✔ \`${target.user.tag}\` ${SuccesBan}
                    \n**Reason :** \` ${reason2} \`
                    `)
                message.channel.send({
                    embeds: [embed]
                })
                await target.ban({
                    reason: `${reason2} || Banned by : ${mod}`
                })
                //console.log(`${reason2} || Banned by : ${mod}`)
            } else {
                return message.channel.send(IDontBan)
            }
            return;
        }

        if (target.bannable) {
            let embed = new MessageEmbed()
                .setColor('RED')
                .setDescription(`
                ✔ \`${target.user.tag}\` ${SuccesBan}
                \n**Reason :** \` ${reason} \`
                `)
            message.channel.send({
                embeds: [embed]
            })
            await target.ban({
                reason: `${reason} || Banned by : ${mod}`
            })
            //console.log(`${reason} || Banned by : ${mod}`)
        } else {
            return message.channel.send(IDontBan)
        }
        return

    },
};