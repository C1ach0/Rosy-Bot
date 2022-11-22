const Discord = require("discord.js");
module.exports = {
   name: "membercount",
   aliases: ["", "", ""],
   cooldowns: 3000,
   description: "See how much we are on the server",
   usage: "",
   toggleOff: false,
   developersOnly: false,
   userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
   botpermissions: ["ADMINISTRATOR"],

   run: async (client, message, args) => {
    message.channel.send(`<:L_hiden:877191627305807882> **We are** \`${message.guild.memberCount}\` **on the server.**`)
   },
};
