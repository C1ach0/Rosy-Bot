const {
    Message,
    Client,
    MessageEmbed,
    Permissions
} = require("discord.js");

module.exports = {
    name: "repeatlist",
    aliases: ['repeatqueue', 'loop'],
    cooldowns: 3000,
    description: "Repeat a queue",
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
        client.player.getQueue(message.guild.id).setRepeatMode(RepeatMode.QUEUE)
        
        let queue = await client.player.getQueue(message.guild.id);
        // Get the current song
        let song = await queue.play()
        message.channel.send(`A list will be repeated indefinitely!`);
    },
};