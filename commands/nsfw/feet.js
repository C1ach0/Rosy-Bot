const Discord = require("discord.js");
const randomporn = require('discord-porn')
module.exports = {
    name: "feet",
    cooldowns: 3000,
    description: "Display image of feet",
    usage: "[user]",
    toggleOff: false,
    developersOnly: false,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botpermissions: ["ADMINISTRATOR"],

    run: async (client, message, args) => {
        if(!message.channel.nsfw) return
        const target = message.mentions.members.first() || message.author
        const img = randomporn.feet()
        const embed = new Discord.MessageEmbed()
            .setColor("#ffffff")
            .setDescription(`Feet of ${target}`)
            .setImage(img)
        message.channel.send({
            embeds: [embed]
        })
    },
};