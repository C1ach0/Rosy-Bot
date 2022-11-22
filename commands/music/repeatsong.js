const {
    Message,
    Client,
    MessageEmbed,
    Permissions
} = require("discord.js");

module.exports = {
    name: "repeatsong",
    cooldowns: 3000,
    description: "Repeat a song",
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
        client.player.getQueue(message.guild.id).setRepeatMode(RepeatMode.SONG)
        
        let queue = await client.player.getQueue(message.guild.id);
        // Get the current song
        let song = await queue.play()
        message.channel.send(`${song.name} will be repeated indefinitely!`);
    },
};