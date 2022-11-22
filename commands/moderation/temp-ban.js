const {
    Message,
    Client,
    MessageEmbed,
    Permissions
} = require("discord.js");
const { QuickDB } = require('quick.db');

module.exports = {
    name: "tempban",
    aliases: ['tban'],
    cooldowns: 3000,
    description: "Temporarily ban a guild member",
    usage: "<@user> <days>",
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

        // Language
        const NotPerm = client.lang["translations"]["MODERATION"]["TBAN"]["Not-Perms"][Lang || "en"]
        const MentionMember = client.lang["translations"]["MODERATION"]["TBAN"]["MentionMember"][Lang || "en"]
        const CannotBan = client.lang["translations"]["MODERATION"]["TBAN"]["CannotBan"][Lang || "en"]
        const BanBot = client.lang["translations"]["MODERATION"]["TBAN"]["BanBot"][Lang || "en"]
        const BanYourself = client.lang["translations"]["MODERATION"]["TBAN"]["BanYourself"][Lang || "en"]
        const ManyDays = client.lang["translations"]["MODERATION"]["TBAN"]["ManyDays"][Lang || "en"]
        const Succes1 = client.lang["translations"]["MODERATION"]["TBAN"]["Succes1"][Lang || "en"]
        const Succes2 = client.lang["translations"]["MODERATION"]["TBAN"]["Succes2"][Lang || "en"]
        const IDontBan = client.lang["translations"]["MODERATION"]["TBAN"]["IDontBan"][Lang || "en"]

        // Commands

        if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.reply(NotPerm)

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const timer = args[1]
        const reason = args.slice(2).join(' ') || 'Not Reason'
        const mod = message.author.tag;

        if (!target) return message.reply(MentionMember)
        if (target.roles.highest.position >= message.member.roles.highest.position) {
            return message.channel.send(CannotBan)
        }
        if (message.mentions.users.first().bot) return message.channel.send(BanBot)
        if (target.id === message.author.id) return message.channel.send(BanYourself)

        if (!timer) return message.reply(ManyDays)

        if (target.bannable) {
            let embed = new MessageEmbed()
                .setColor('RED')
                .setDescription(`
                ✔ \`${target.user.tag}\` ${Succes1} \`${timer}\` ${Succes2}
                \n**Reason :** \` ${reason} \`
                `)
            message.channel.send({
                embeds: [embed]
            })
            await target.ban({
                reason: `${reason} || Time : ${timer} days || Banned by : ${mod}`
            })
            //console.log(`${reason} || Time : ${timer} days || Banned by : ${mod}`)
            setTimeout(() => {
                message.guild.members.unban(target).catch(err => console.log())

            }, timer * 86400000);
        } else {
            return message.channel.send(IDontBan)
        }
        return
    },
};