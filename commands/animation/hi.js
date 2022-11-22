const Discord = require("discord.js");
const randomanime = require('discord-anime');
module.exports = {
   name: "hi",
   cooldowns: 3000,
   description: "Just send 'hey!' image",
   usage: "",
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
    const img = randomanime.hi()
    const embed = new Discord.MessageEmbed()
    .setColor("#ffffff")
    .setDescription(`${message.author} hi ${!message.mentions.members.first() ? "everyone" : message.mentions.members.first()}`)
    .setImage(img)
    message.channel.send({embeds: [embed]})
   },
};
