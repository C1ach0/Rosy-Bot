const Discord = require("discord.js");
const randomporn = require('discord-porn')
module.exports = {
    name: "pussy",
    cooldowns: 3000,
    description: "Display image of pussy",
    usage: "[user]",
    toggleOff: false,
    developersOnly: false,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botpermissions: ["ADMINISTRATOR"],

    run: async (client, message, args) => {
        if(!message.channel.nsfw) return
        const target = message.mentions.members.first() || message.author
        const img = randomporn.pussy()
        const embed = new Discord.MessageEmbed()
            .setColor("#ffffff")
            .setDescription(`Pussy of ${target}`)
            .setImage(img)
        message.channel.send({
            embeds: [embed]
        })
    },
};