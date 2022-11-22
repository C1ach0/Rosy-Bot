const Discord = require("discord.js");
const { QuickDB } = require('quick.db')

module.exports = {
    name: "bonus",
    aliases: ["xp"],
    cooldowns: 3000,
    description: "Give or remove from XP to a member",
    usage: "<add/remove> <user> <xp amout>",
    toggleOff: false,
    developersOnly: false,
    userpermissions: ["MANAGE_GUILD"],
    botpermissions: [],
    /**
     * @param {Discord.Message} message
     */
    run: async (client, message, args) => {
        const db = new QuickDB({
            'table': `Guild_${message.guildId}`
        })

        const LevelSystem = await db.get(`LevelSystem`)
        if (LevelSystem == null) return message.reply('Level system disabled on the server.')

        if (!args[0]) return message.reply("Please specify 'add' or 'remove'")
        let add = ["add", "+"]
        let del = ["remove", "-"]
        if (add.includes(args[0])) {
            if (!args[1]) return message.reply("Please mention a user")
            let target = message.mentions.users.last() || message.guild.members.cache.get(args[1])
            if(!args[2] || isNaN(args[2])) return message.reply("Please mention xp amount")
            await db.add(`Level_xp_${target.id}`, args[2])
            var level = await db.get(`Level_level_${target.id}`) || 0;
            var xp = await db.get(`Level_xp_${target.id}`)
            const embed = new Discord.MessageEmbed()
            .setColor("#ffffff")
            .setAuthor(target.tag, target.avatarURL({dynamic: true}))
            .setDescription(`You have added ${args[2]} xp to ${target}\n
            Total xp : \`${xp}\`\n
            Level : \`${level}\``)
            message.react('✔')
            return message.reply({embeds: [embed]})
        }
        if (del.includes(args[0])) {
            if (!args[1]) return message.reply("Please mention a user")
            let target = message.mentions.users.last() || message.guild.members.cache.get(args[1])
            if(!args[2] || isNaN(args[2])) return message.reply("Please mention xp amount")
            await db.subtract(`Level_xp_${target.id}`, args[2])
            var level = await db.get(`Level_level_${target.id}`) || 0;
            var xp = await db.get(`Level_xp_${target.id}`)
            const embed = new Discord.MessageEmbed()
            .setColor("#ffffff")
            .setAuthor(target.tag, target.avatarURL({dynamic: true}))
            .setDescription(`You have added ${args[2]} xp to ${target}\n
            Total xp : \`${xp}\`\n
            Level : \`${level}\``)
            message.react('✔')
            return message.reply({embeds: [embed]})
        }
    },
};