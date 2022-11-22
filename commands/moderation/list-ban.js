const {
    Message,
    Client,
    MessageEmbed,
    Permissions
} = require("discord.js");
const { QuickDB } = require('quick.db');

module.exports = {
    name: "ban-list",
    aliases: ['list-ban'],
    cooldowns: 3000,
    description: "All members banished in the guild",
    usage: "",
    toggleOff: false,
    developersOnly: false,
    userpermissions: ["BAN_MEMBERS"],
    botpermissions: ["BAN_MEMBERS"],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        message.guild.bans.fetch().then(banned => {
            let list = banned.map(ban => ban.user.tag).join('\n');

            if (list.length >= 1950) list = `${list.slice(0, 1948)}...`;

            let embed = new MessageEmbed()
                .setColor('WHITE')
                .setTitle('Ban List - '+message.guild.name)
                .setDescription(`
            **__Banned Members :__** ${banned.size}
            \n**__List :__**
            ${list}
            `)
            message.channel.send({
                embeds: [embed]
            })

        })
    },
};