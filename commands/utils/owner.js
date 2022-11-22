const Discord = require("discord.js");
module.exports = {
   name: "owner",
   aliases: ["", "", ""],
   cooldowns: 3000,
   description: "",
   usage: "",
   toggleOff: false,
   developersOnly: false,
   userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
   botpermissions: ["ADMINISTRATOR"],

   run: async (client, message, args) => {
    message.channel.send(`<:806427389725900830:893212775717937162> ${message.author.tag}, My creator is **${message.client.users.cache.get(client.config.OwnerId).tag}**`)
   },
};
