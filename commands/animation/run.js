const Discord = require("discord.js");
const randomanime = require('discord-anime');
module.exports = {
   name: "run",
   cooldowns: 3000,
   description: "You run",
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
    const img = randomanime.run()
    const embed = new Discord.MessageEmbed()
    .setColor("#ffffff")
    .setDescription(`${message.author} run`)
    .setImage(img)
    message.channel.send({embeds: [embed]})

   },
};
