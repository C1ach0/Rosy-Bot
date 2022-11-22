const Discord = require("discord.js");
const {
    QuickDB
} = require('quick.db')
module.exports = {
    name: "banner",
    aliases: ["", "", ""],
    cooldowns: 3000,
    description: "Show user banner",
    usage: "[user]",
    toggleOff: true,
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
        const target = message.mentions.members.first() || message.member
        console.log(target.user)
        // if (bannerOn) {
        //     let embed = new Discord.MessageEmbed()
        //         .setColor('WHITE')
        //         .setTitle(`Banner - ${target.user.username}`)
        //         .setImage(target.user.bannerURL())
        //     message.channel.send({
        //         embeds: [embed]
        //     })
        // }

    },
};