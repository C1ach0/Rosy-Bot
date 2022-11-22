const Discord = require("discord.js");
const {
    QuickDB
} = require('quick.db')
module.exports = {
    name: "atm",
    aliases: ["", "", ""],
    cooldowns: 3000,
    description: "Put money from the bag in the bank or vice versa",
    usage: "<+ / -> <amount of money>",
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
        let add = ["+", "add"]
        let sub = ["-", "remove"]
        if (add.includes(args[0])) {
            if (!args[1]) return message.reply("Please mention the amount of money to be transferred to the bank.")
            let bag = await db.get(`economy_user_${target.id}.bag`)
            let quant = parseInt(args[1])
            if (bag >= quant) {
                await db.sub(`economy_user_${target.id}.bag`, quant)
                await db.add(`economy_user_${target.id}.bank`, quant)
                let embed = new Discord.MessageEmbed()
                    .setColor('WHITE')
                    .setTitle(`ATM - ${message.guild.name}`)
                    .setDescription(`You have just transferred \`$${quant}\` to the bank.`)
                    .setTimestamp()
                    .setFooter(message.author.username, message.author.displayAvatarURL({
                        dynamic: true
                    }))
                return message.channel.send({
                    embeds: [embed]
                })
            } else return message.reply("You do not have enough money.")

        } else if (sub.includes(args[0])) {
            if (!args[1]) return message.reply("Please mention the amount of money to be transferred to the bag.")
            let bank = await db.get(`economy_user_${target.id}.bank`)
            let quant = parseInt(args[1])
            if (bank >= quant) {
                await db.sub(`economy_user_${target.id}.bank`, quant)
                await db.add(`economy_user_${target.id}.bag`, quant)
                let embed = new Discord.MessageEmbed()
                    .setColor('WHITE')
                    .setTitle(`ATM - ${message.guild.name}`)
                    .setDescription(`You have just transferred \`$${quant}\` to the bag.`)
                    .setTimestamp()
                    .setFooter(message.author.username, message.author.displayAvatarURL({
                        dynamic: true
                    }))
                return message.channel.send({
                    embeds: [embed]
                })
            } else return message.reply("You do not have enough money.")
        } else return message.reply("Do you want to add or remove? ('add' / '+' or 'remove' / '-'")


    },
};