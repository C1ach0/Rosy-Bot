const {
    Message,
    Client,
    MessageEmbed,
    Permissions
} = require("discord.js");

module.exports = {
    name: "nowplay",
    cooldowns: 3000,
    description: "Show music in court",
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
        let song = await client.player.getQueue(message.guild.id).nowPlaying();
        message.channel.send(`Chanson actuel: **${song.name}**`);
    },
};