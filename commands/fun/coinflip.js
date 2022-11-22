const { Message, Client, MessageEmbed } = require("discord.js");
const { QuickDB } = require('quick.db')


module.exports = {
    name: "coinflip",
    description: "Tails or heads",
    cooldowns: 3000,
   toggleOff: false,
   developersOnly: false,
   userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
   botpermissions: ["SEND_MESSAGES", "MANAGE_WEBHOOKS"],

    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const db = new QuickDB({ 'table': `Guild_${message.guildId}`});
        const Lang = db.get(`Language`)
        if(Lang == 'en' || null) {
            const n = Math.floor(Math.random() * 2);
            let result;
            if (n === 1) result = 'heads';
            else result = 'tails ';
            const embed = new MessageEmbed()
                .setTitle('½  Coinflip  ½')
                .setDescription(`I threw a coin for you, ${message.member}. It's **${result}** ! `)
                .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor(message.guild.me.displayHexColor);
            message.channel.send({ embeds: [embed] });
            setTimeout(() => {
                message.delete()
            }, 1000);
        }
        if(Lang == 'fr') {
            const n = Math.floor(Math.random() * 2);
            let result;
            if (n === 1) result = 'Face';
            else result = 'Pile ';
            const embed = new MessageEmbed()
                .setTitle('½  Pile ou Face  ½')
                .setDescription(`J'ai jeté une pièce de monnaie pour toi, ${message.member}. C'est **${result}** ! `)
                .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor(message.guild.me.displayHexColor);
            message.channel.send({ embeds: [embed] });
            setTimeout(() => {
                message.delete()
            }, 1000);
        }

        
    },
};