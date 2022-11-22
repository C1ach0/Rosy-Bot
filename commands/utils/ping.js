const Discord = require("discord.js");

module.exports = {
   name: "ping",
   aliases: ["p", "pong"],
   description: "Returns Latency Ping",
   botpermissions: ["ADMINISTRATOR"],
   usage: "",
   cooldowns: 2000,
   developersOnly: false,
   toggleOff: false,
   run: async (client, message, args) => {
      message.channel.send(`Pinging...`).then((m4) => {
         setTimeout(() => {
            m4.edit(`\`${Math.floor(m4.createdAt - message.createdAt)} ms\` is my latency`);
         }, 2000);
      });
   },
};