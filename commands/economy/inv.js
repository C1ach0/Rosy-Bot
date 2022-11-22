const Discord = require("discord.js");
const {
    QuickDB
} = require('quick.db')
module.exports = {
    name: "inventory",
    aliases: ["inv", "", ""],
    cooldowns: 3000,
    description: "See your inventory",
    usage: "",
    toggleOff: false,
    developersOnly: false,
    userpermissions: [],
    botpermissions: ["ADMINISTRATOR"],
    /**
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {string[]} args 
     */
    run: async (client, message, args) => {
        const db = new QuickDB({
            'table': `Guild_${message.guildId}`
        });
        const a = await db.get("Economy");
        if (a == null || a == false) return message.reply("Economy system disable")
        let target = message.author
        let started = await db.get(`economy_user_${target.id}.started`)
        if (!started) return message.reply(`You haven't started playing yet.`)

        const inv = await db.get(`economy_user_${target.id}.inv`)
        if(!inv) {
            const emb = new Discord.MessageEmbed()
            .setColor("DARK_GOLD")
            .setTitle(`Inventory - ${target.username}`)
            .setDescription(`You don't have items`)
            return message.channel.send({embeds: [emb]})
        }

        inv,
        keys = Object.keys(inv),
        len = keys.length;
        let desc = keys.sort((a, b) => b-a).map((k, i) => `\`${k}: ${inv[k]}\``).toString();

        const emb = new Discord.MessageEmbed()
        .setColor("DARK_GOLD")
        .setTitle(`Inventory - ${target.username}`)
        .setDescription(`Items :\n${desc}`)
        message.channel.send({embeds: [emb]})
    },
};