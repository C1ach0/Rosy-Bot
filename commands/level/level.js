const {
    Message,
    Client,
    MessageEmbed,
    MessageAttachment,
    Permissions
} = require("discord.js");
const { QuickDB } = require('quick.db')

const canvacord = require("canvacord");

module.exports = {
    name: "level",
    aliases: ['lvl', 'rank'],
    cooldowns: 3000,
    description: "Show your level",
    usage: "[user]",
    toggleOff: false,
    developersOnly: true,
    userpermissions: [],
    botpermissions: [],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const db = new QuickDB({
            'table': `Guild_${message.guildId}`
        })
        if(message.author.bot) return
        if(!message.guild) return

        const LevelSystem = await db.get(`LevelSystem`)
        if(LevelSystem == null) return message.reply('Level system disabled on the server.')
        var user = message.mentions.members.first() || message.member;

        const db2 = new QuickDB({
            'table': `User_${user.id}`
        })
        const background = await db2.get('RankCard') || 'https://cdn.discordapp.com/attachments/896781066784870451/903636958004252682/7.png'

        
        var level = await db.get(`Level_level_${user.user.id}`) || 0;
        var currentxp = await db.get(`Level_xp_${user.user.id}`) || 0;
        var xpNeeded = level * 500 + 500
        
        const rank = new canvacord.Rank()
            .setAvatar(user.user.displayAvatarURL({dynamic: false,  format: 'png'}))
            .setCurrentXP(currentxp)
            .setRequiredXP(xpNeeded)
            .setLevel(level)
            .setStatus("online")
            .setProgressBar("#00FFFF", "COLOR")
            .setUsername(user.user.username)
            .setDiscriminator(user.user.discriminator)
            .setRank(1, "a", false)
            .setBackground("IMAGE", background);

        rank.build()
        .then(data => {
            const attachment = new MessageAttachment(data, "RankCard.png");
            // message.channel.send({attachments: [attachment]});
            //console.log(attachment)
            console.log(data)
        });
    },
};