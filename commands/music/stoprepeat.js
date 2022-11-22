const {
    Message,
    Client,
    MessageEmbed,
    Permissions
} = require("discord.js");

module.exports = {
    name: "stoprepeat",
    cooldowns: 3000,
    description: "Stopped the repetition of music",
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
        client.player.getQueue(message.guild.id).setRepeatMode(RepeatMode.DISABLED);
        // Get the current song
        let song = await client.player.play(message.guild.id);
        message.channel.send(`${song.name}  will no longer be repeated indefinitely!`);
    },
};