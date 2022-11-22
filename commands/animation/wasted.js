const Discord = require("discord.js");
const randomanime = require('discord-anime');
module.exports = {
   name: "wasted",
   cooldowns: 3000,
   description: "Wasted mentionned member or random member",
   usage: "[user]",
   toggleOff: false,
   developersOnly: false,
   userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
   botpermissions: ["SEND_MESSAGES", "MANAGE_WEBHOOKS"],
    /**
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {string[]} args 
     */
   run: async (client, message, args) => {
    const target = message.mentions.members.first() || message.guild.members.cache.random()
    const img = randomanime.wasted()
    const embed = new Discord.MessageEmbed()
    .setColor("#ffffff")
    .setDescription(`${target} is wasted`)
    .setImage(img)
    message.channel.send({embeds: [embed]})

   },
};
