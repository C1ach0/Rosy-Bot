const Discord = require("discord.js");
const randomanime = require('discord-anime');
module.exports = {
   name: "nervous",
   cooldowns: 3000,
   description: "Be nervous",
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
    const img = randomanime.nervous()
    const embed = new Discord.MessageEmbed()
    .setColor("#ffffff")
    .setDescription(`${message.author} is nervous`)
    .setImage(img)
    message.channel.send({embeds: [embed]})

   },
};
