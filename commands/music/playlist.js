const {
    Message,
    Client,
    MessageEmbed,
    Permissions
} = require("discord.js");

module.exports = {
    name: "playlist",
    cooldowns: 3000,
    description: "Play a playlist",
    usage: "<url>",
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
        let queue = client.player.createQueue(message.guild.id);
        await queue.join(message.member.voice.channel);
        let song = await queue.playlist(args.join(' ')).catch(_ => {
            if(!guildQueue)
                queue.stop();
        });
        
        let embed = new MessageEmbed()
        .setColor('RED')
        .setAuthor(message.author.username)
        .setTitle(song.name +' / '+ song.author)
        .setDescription(`
        Duration : ${song.duration}
        `)
        .setImage(song.thumbnail)

        message.channel.send({embeds: [embed]})
    },
};