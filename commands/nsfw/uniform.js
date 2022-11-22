const Discord = require("discord.js");
const randomporn = require('discord-porn')
module.exports = {
    name: "uniform",
    cooldowns: 3000,
    description: "Display image of uniform",
    usage: "[user]",
    toggleOff: false,
    developersOnly: false,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botpermissions: ["ADMINISTRATOR"],

    run: async (client, message, args) => {
        if(!message.channel.nsfw) return
        const target = message.mentions.members.first() || message.author
        const img = randomporn.uniform()
        const embed = new Discord.MessageEmbed()
            .setColor("#ffffff")
            .setDescription(`Uniform of ${target}`)
            .setImage(img)
        message.channel.send({
            embeds: [embed]
        })
    },
};