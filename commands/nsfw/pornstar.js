const Discord = require("discord.js");
const randomporn = require('discord-porn')
module.exports = {
    name: "pornstar",
    cooldowns: 3000,
    description: "Display image of pornstar",
    usage: "",
    toggleOff: false,
    developersOnly: false,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botpermissions: ["ADMINISTRATOR"],

    run: async (client, message, args) => {
        if(!message.channel.nsfw) return
        const img = randomporn.pornstar()
        const embed = new Discord.MessageEmbed()
            .setColor("#ffffff")
            .setDescription(`Pornstar :`)
            .setImage(img)
        message.channel.send({
            embeds: [embed]
        })
    },
};