const {
    Message,
    Client,
    MessageEmbed,
    Permissions
} = require("discord.js");

module.exports = {
    name: "seek",
    cooldowns: 3000,
    description: "Advanced x seconds music",
    usage: "<seconds>",
    toggleOff: false,
    developersOnly: false,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botpermissions: ["ADMINISTRATOR"],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        client.player.getQueue(message.guild.id).seek(parseInt(args[0]) * 1000);

        message.channel.send(`The music has been advanced \`${args[0]} seconds\``)
    },
};