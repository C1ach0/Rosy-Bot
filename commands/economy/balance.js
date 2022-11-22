const Discord = require("discord.js");
const {
    QuickDB
} = require('quick.db')
module.exports = {
    name: "balance",
    aliases: ["bal", "money"],
    cooldowns: 3000,
    description: "Your own balance",
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
        let target = "";
        if(args[0]) {target = message.mentions.users.first();}
        else target = message.author
        let started = await db.get(`economy_user_${target.id}.started`)
        if(!started) return message.reply(`${target} has not yet started playing.`)
        let bank = parseInt(await db.get(`economy_user_${target.id}.bank`))
        let bag = parseInt(await db.get(`economy_user_${target.id}.bag`))
        const embed = new Discord.MessageEmbed()
            .setColor('WHITE')
            .setTitle(`Balance - ${target.username}`)
            .addField("Bank", `\`$${!bank.toFixed(0) ? "0" : bank.toFixed(0)}\``, true)
            .addField("Bag", `\`$${!bag.toFixed(0) ? "0" : bag.toFixed(0)}\``, true)
        message.channel.send({embeds: [embed]})
    },
};