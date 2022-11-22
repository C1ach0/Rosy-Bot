const {
    Message,
    Client,
    MessageEmbed,
    Permissions
} = require("discord.js");

module.exports = {
    name: "resume",
    cooldowns: 3000,
    description: "Resume a music",
    usage: "",
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
        let song = await client.player.getQueue(message.guild.id).setPaused(false);
        message.channel.send(`**${song.name}** est relancé !`);
    },
};