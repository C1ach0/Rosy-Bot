const {
    Message,
    Client,
    MessageEmbed,
    Permissions
} = require("discord.js");
const { QuickDB } = require('quick.db');

module.exports = {
    name: "mute",
    cooldowns: 3000,
    description: "Mute a member",
    usage: "<user>",
    toggleOff: false,
    developersOnly: false,
    userpermissions: ["MANAGE_MESSAGE"],
    botpermissions: ["MANAGE_MESSAGE"],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        //const db = new QuickDB({ 'table': `Guild_${message.guildId}`}); 

        // Language

        const Lang = await db.get(`Language`)

        const NotPerm = client.lang["translations"]["MODERATION"]["MUTE"]["Not-Perms"][Lang || "en"]
        const NoRoleCalled = client.lang["translations"]["MODERATION"]["MUTE"]["NoRoleCalled"][Lang || "en"]
        const MentionMember = client.lang["translations"]["MODERATION"]["MUTE"]["MentionMember"][Lang || "en"]
        const CannotMute = client.lang["translations"]["MODERATION"]["MUTE"]["CannotMute"][Lang || "en"]
        const MuteBot = client.lang["translations"]["MODERATION"]["MUTE"]["MuteBot"][Lang || "en"]
        const MuteYourself = client.lang["translations"]["MODERATION"]["MUTE"]["MuteYourself"][Lang || "en"]
        const SuccesMute = client.lang["translations"]["MODERATION"]["MUTE"]["SuccesMute"][Lang || "en"]


        /* It's checking if the user has the permission to ban the user. */
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!target) return message.reply(MentionMember)
        if (target.roles.highest.position >= message.member.roles.highest.position) {
            return message.reply(CannotMute)
        }
        if (target.id === message.author.id) return message.channel.send(MuteYourself)

        /* It's getting the reason and the mod tag. */
        const time = args[1]
        const reason = args.slice(2).join(' ');
        const mod = message.author.tag;
        const mss = ms(time)
        try {
            if (!reason) {
            const reason2 = 'Not Reason'

            let embed = new MessageEmbed()
                .setColor('#000')
                .setDescription(`
                \`${target.user.tag}\` is mute during ${msToTime(mss)}
                \n**Reason :** \` ${reason2} \`
                `)
            message.channel.send({
                embeds: [embed]
            }).then(m => {
                setTimeout(() => {
                    m.delete()
                }, 5000);
            })
            await target.timeout(mss, `${reason2} || Muted by : ${mod}`)
            //console.log(`${reason2} || Muted by : ${mod}`)
            return
            }

            /* It's checking if the user is bannable. If it's true, it's sending a message with the reason.
            If not, it's sending a message with the reason "I can't ban the user."</code> */
            
            let embed = new MessageEmbed()
                .setColor('#000')
                .setDescription(`
                \`${target.user.tag}\` is mute during ${msToTime(mss)}
                \n**Reason :** \` ${reason} \`
                `)
            message.channel.send({
                embeds: [embed]
            }).then(m => {
                setTimeout(() => {
                    m.delete()
                }, 5000);
            })
            await target.timeout(mss, `${reason} || Muted by : ${mod}`)
            // console.log(`${reason} || Muted by : ${mod}`)
        return
        } catch (error) {
            
        }
        /* It's checking if the user has a reason. If not, it's sending a message with the reason "Not
        Reason". */


    },
};

function msToTime(ms) {
    let seconds = (ms / 1000).toFixed(0);
    let minutes = (ms / (1000 * 60)).toFixed(0);
    let hours = (ms / (1000 * 60 * 60)).toFixed(0);
    let days = (ms / (1000 * 60 * 60 * 24)).toFixed(0);
    if (seconds < 60) return seconds + " secondes";
    else if (minutes < 60) return minutes + " minutes";
    else if (hours < 24) return hours + " heures";
    else return days + " jours"
}