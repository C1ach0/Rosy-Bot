const {
    Message,
    Client,
    MessageEmbed,
    Permissions
} = require("discord.js");

module.exports = {
    name: "list",
    aliases: ["queue"],
    cooldowns: 3000,
    description: "Displays the current music list",
    usage: "<code>",
    toggleOff: false,
    developersOnly: true,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botpermissions: ["ADMINISTRATOR"],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let queue = await client.player.getQueue(message.guild.id);
        let embed = new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(
                'Piste musical:\n' + (queue.songs.map((song, i) => {
                    return `${i === 0 ? 'En cours d\'écoute' : `#${i+1}`} - **${song.name}** | *${song.author}*`
                }).join('\n'))
            )
        message.channel.send({
            embeds: [embed]
        });
    },
};