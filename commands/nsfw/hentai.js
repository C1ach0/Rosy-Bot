const Discord = require("discord.js");
const randomporn = require('discord-porn')
module.exports = {
    name: "hentai",
    cooldowns: 3000,
    description: "Display image of hentai",
    usage: "",
    toggleOff: false,
    developersOnly: false,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botpermissions: ["ADMINISTRATOR"],

    run: async (client, message, args) => {
        if(!message.channel.nsfw) return
        const img = randomporn.hentai()
        const embed = new Discord.MessageEmbed()
            .setColor("#ffffff")
            .setDescription(`Hentai :`)
            .setImage(img)
        message.channel.send({
            embeds: [embed]
        })
    },
};