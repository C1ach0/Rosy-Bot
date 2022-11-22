const Discord = require("discord.js");
const randomanime = require('discord-anime');
module.exports = {
   name: "sleep",
   cooldowns: 3000,
   description: "Go to Sleep",
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
    const img = randomanime.sleep()
    const embed = new Discord.MessageEmbed()
    .setColor("#ffffff")
    .setDescription(`${message.author} go to sleep`)
    .setImage(img)
    message.channel.send({embeds: [embed]})

   },
};
