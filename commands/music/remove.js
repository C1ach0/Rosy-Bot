const {
    Message,
    Client,
    MessageEmbed,
    Permissions
} = require("discord.js");

module.exports = {
    name: "remove",
    cooldowns: 3000,
    description: "Remove a music from a queue",
    usage: "<number>",
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
        client.player.getQueue(message.guild.id).remove(parseInt(args[0])-1)
        message.channel.send(`La chanson **${args[0]}** a été enlevé de la piste !`);
    },
};