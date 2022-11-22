const Discord = require("discord.js");
const { QuickDB } = require('quick.db')
module.exports = {
    name: "usage",
    aliases: ["", "", ""],
    cooldowns: 3000,
    description: "Shows how many times the bot to server served",
    usage: "",
    toggleOff: false,
    developersOnly: false,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botpermissions: ["ADMINISTRATOR"],

    run: async (client, message, args) => {
        const db = new QuickDB({
            'table': "Others"
        })
        const commandsexe = await db.get(`NB_Utilisation`)

        let embed = new Discord.MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setTitle(`Analystics`)
            .addFields({
                    name: 'Number of commands executed',
                    value: `**${commandsexe == null ? 'None' : commandsexe}**`,
                    inline: true
                },
                //{name: 'Number of commands executed', value: `**${commandsexe}**`, inline: true}
            )
            .setFooter(`Developped by ${message.client.users.cache.get(client.config.OwnerId).tag} by love ❤`, message.guild.me.avatarURL())
        message.channel.send({
            embeds: [embed]
        })
    },
};