const Discord = require("discord.js");
const {
    QuickDB
} = require('quick.db')
module.exports = {
    name: "craft",
    aliases: ["forge", "cook", ""],
    cooldowns: 3000,
    description: "Create new items",
    usage: "<gold / bread / fish> / [docs]",
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

        let list = ["gold", "bread", "fish", "gold_ore", "bread", "coocked_fish", "gold_ingot", "wheat"];
        let bread = ["wheat", "bread"]
        let ck_fish = ["fish", "coocked_fish"]
        let gold = ["gold", "gold_ore", "gold_ingot"]

        if (!list.includes(args[0])) return message.reply("Please mention an item has transformed. (wheat, gold, fish)")
        if (bread.includes(args[0])) {
            if(isNaN(args[1])) return message.reply("Please put a number.")
            let nb = parseInt(args[1])
            let dbNB = await db.get(`economy_user_${target.id}.inv.wheat`) / 2
            let coal = await db.get(`economy_user_${target.id}.inv.coal`)
            let c = nb % dbNB
            let reste = c * 2
            let intoDB = nb*2
            if(coal < intoDB) return message.reply(`You miss \`${intoDB} coal\``)
            if (reste != 0) {
                await db.sub(`economy_user_${target.id}.inv.wheat`, intoDB)
                await db.sub(`economy_user_${target.id}.inv.coal`, intoDB)
                await db.add(`economy_user_${target.id}.inv.bread`, nb)
                let emb = new Discord.MessageEmbed()
                .setColor("WHITE")
                .setTitle(`Craft - ${message.guild.name}`)
                .setDescription(`You just created \`${nb} bread\`, you lose \`${intoDB} wheat and coal.\``)
                message.channel.send({embeds: [emb]})
            } else return message.reply(`You miss it \`${reste} wheat\``)
        } else if (ck_fish.includes(args[0])) {
            if(isNaN(args[1])) return message.reply("Please put a number.")
            let nb = parseInt(args[1])
            let dbNB = await db.get(`economy_user_${target.id}.inv.fish`) / 2
            let coal = await db.get(`economy_user_${target.id}.inv.coal`)
            let c = nb % dbNB
            let reste = c * 2
            let intoDB = nb*2
            if(coal < intoDB) return message.reply(`You miss \`${intoDB} coal\``)
            if (reste != 0) {
                await db.sub(`economy_user_${target.id}.inv.fish`, intoDB)
                await db.sub(`economy_user_${target.id}.inv.coal`, intoDB)
                await db.add(`economy_user_${target.id}.inv.coocked_fish`, nb)
                let emb = new Discord.MessageEmbed()
                .setColor("WHITE")
                .setTitle(`Craft - ${message.guild.name}`)
                .setDescription(`You just created \`${nb} bread\`, you lose \`${intoDB} wheat and coal.\``)
                message.channel.send({embeds: [emb]})
            } else return message.reply(`You miss it \`${reste} fish\``)
        } else if (gold.includes(args[0])) {
            if(isNaN(args[1])) return message.reply("Please put a number.")
            let nb = parseInt(args[1])
            let dbNB = await db.get(`economy_user_${target.id}.inv.gold_ore`) / 2
            let coal = await db.get(`economy_user_${target.id}.inv.coal`)
            let c = nb % dbNB
            let reste = c * 2
            let intoDB = nb*2
            if(coal < intoDB) return message.reply(`You miss \`${intoDB} coal\``)
            if (reste != 0) {
                await db.sub(`economy_user_${target.id}.inv.gold_ore`, intoDB)
                await db.sub(`economy_user_${target.id}.inv.coal`, intoDB)
                await db.add(`economy_user_${target.id}.inv.gold_ingot`, nb)
                let emb = new Discord.MessageEmbed()
                .setColor("WHITE")
                .setTitle(`Craft - ${message.guild.name}`)
                .setDescription(`You just created \`${nb} bread\`, you lose \`${intoDB} wheat and coal.\``)
                message.channel.send({embeds: [emb]})
            } else return message.reply(`You miss it \`${reste} gold ore\``)
        }
    },
};