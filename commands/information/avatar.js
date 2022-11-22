const Discord = require("discord.js");
const {
    QuickDB
} = require('quick.db')
module.exports = {
    name: "avatar",
    aliases: ["pp", "", ""],
    cooldowns: 3000,
    description: "Show user avatar",
    usage: "[user]",
    toggleOff: false,
    developersOnly: false,
    userpermissions: [],
    botpermissions: [],
    /**
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {string[]} args 
     */
    run: async (client, message, args) => {
        const db = new QuickDB({
            'table': `Guild_${message.guildId}`
        });
        const target = message.mentions.members.first().user || message.member.user
        let embed = new Discord.MessageEmbed()
        .setColor('WHITE')
        .setTitle(`Avatar - ${target.username}`)
        .setImage(target.displayAvatarURL({size: 4096, dynamic: true}))
        message.channel.send({embeds: [embed]})
    },
};