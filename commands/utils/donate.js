const Discord = require("discord.js");
module.exports = {
   name: "donate",
   aliases: ["don"],
   cooldowns: 3000,
   description: "Donate to the Creator of the Bot",
   usage: "",
   toggleOff: false,
   developersOnly: false,
   userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
   botpermissions: ["ADMINISTRATOR"],

   run: async (client, message, args) => {
    message.channel.send(`
    <:bling:893212775604699147> ${message.author.tag}, here are the options available to donate to Rosy. Thanks in advance !! <:hug2:893212775806021663>
    ↠ https://www.paypal.me/c1ach0
    `)
   },
};
