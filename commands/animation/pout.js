const Discord = require("discord.js");
const randomanime = require('discord-anime');
module.exports = {
   name: "pout",
   cooldowns: 3000,
   description: "Pout mentionned member or random member",
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
    const img = randomanime.pout()
    const embed = new Discord.MessageEmbed()
    .setColor("#ffffff")
    .setDescription(`${message.author} pout ${target}`)
    .setImage(img)
    message.channel.send({embeds: [embed]})

   },
};
