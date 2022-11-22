const Discord = require("discord.js");
const {
    QuickDB
} = require('quick.db')

let sell1 = {
    "wheat": 1,
    "bread": 3,
    "gold_ore": 3,
    "gold_ingot": 4,
    "fish": 5,
    "coocked_fish": 7
}

let sell2 = {
    "wheat": 1,
    "bread": 4,
    "gold_ore": 3,
    "gold_ingot": 5,
    "fish": 7,
    "coocked_fish": 11
}

let sell3 = {
    "wheat": 1,
    "bread": 4,
    "gold_ore": 4,
    "gold_ingot": 8,
    "fish": 6,
    "coocked_fish": 13
}

module.exports = {
    name: "shop",
    aliases: ["market", "", ""],
    cooldowns: 3000,
    description: "Buy or sell items",
    usage: "[<buy / sell> <item> <amount>]",
    toggleOff: false,
    developersOnly: false,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
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

        const d = new Date();
        let day = d.getDay()
        const money = await db.get(`economy_user_${target.id}.bank`)

        if (!args[0]) {
            const emb = new Discord.MessageEmbed()
                .setColor('WHITE')
                .setTitle(`Shop - ${message.guild.name}`)
                .addField("Buy", "`🛒`", true)
                .addField("Sell", "`💵`", true)
            let msg = await message.reply({
                embeds: [emb]
            })
            await msg.react('🛒')
            await msg.react('💵')

            let collector = msg.createReactionCollector(
                (reaction, user) => user.id === message.author.id, {
                    time: 30000
                }
            );

            collector.on('collect', async (reaction, user) => {
                if (reaction._emoji.name === "🛒") {
                    const embBuy = new Discord.MessageEmbed()
                        .setColor('WHITE')
                        .setTitle(`Shop - ${message.guild.name}`)
                        .setDescription("Here are the items that can be purchased.")
                        .addField("Coal", `Price : \`$2\`\nAmount : \`3\``, true)
                    msg.edit({
                        embeds: [embBuy]
                    })
                } else if (reaction._emoji.name === "💵") {
                    if (day == 0 || day == 3 || day == 6) {
                        const embed = new Discord.MessageEmbed()
                            .setColor('WHITE')
                            .setTitle(`Shop - ${message.guild.name}`)
                            .setDescription(`Here are the items you can sell.`)
                            .addField("Wheat", `Price : \`$1\``, true)
                            .addField("Bread", `Price : \`$3\``, true)
                            .addField("Gold_ore", `Price : \`$3\``, true)
                            .addField("Gold_ingot", `Price : \`$4\``, true)
                            .addField("Fish", `Price : \`$5\``, true)
                            .addField("Cooked_fish", `Price : \`$7\``, true)
                        msg.edit({
                            embeds: [embed]
                        })
                    } else if (day == 1 || day == 2 || day == 5) {
                        const embed = new Discord.MessageEmbed()
                            .setColor('WHITE')
                            .setTitle(`Shop - ${message.guild.name}`)
                            .setDescription(`Here are the items you can sell.`)
                            .addField("Wheat", `Price : \`$1\``, true)
                            .addField("Bread", `Price : \`$4\``, true)
                            .addField("Gold_ore", `Price : \`$3\``, true)
                            .addField("Gold_ingot", `Price : \`$5\``, true)
                            .addField("Fish", `Price : \`$7\``, true)
                            .addField("Cooked_fish", `Price : \`$11\``, true)
                        msg.edit({
                            embeds: [embed]
                        })
                    } else if (day == 4) {
                        const embed = new Discord.MessageEmbed()
                            .setColor('WHITE')
                            .setTitle(`Shop - ${message.guild.name}`)
                            .setDescription(`Here are the items you can sell.`)
                            .addField("Wheat", `Price : \`$1\``, true)
                            .addField("Bread", `Price : \`$4\``, true)
                            .addField("Gold_ore", `Price : \`$4\``, true)
                            .addField("Gold_ingot", `Price : \`$8\``, true)
                            .addField("Fish", `Price : \`$6\``, true)
                            .addField("Cooked_fish", `Price : \`$13\``, true)
                        msg.edit({
                            embeds: [embed]
                        })
                    }
                }
            })

            collector.on('end', collected => {
                const embC = new Discord.MessageEmbed()
                    .setColor('WHITE')
                    .setTitle(`Shop - ${message.guild.name}`)
                    .setDescription("The shop is closed")
                return msg.edit({
                    embeds: [embC]
                })
            })
        }
        let buyable = ["coal"]
        if (args[0] == "buy") {
            if (!args[1] && !args[2]) return message.reply("Please specify the item and quantity.")
            if (!buyable.includes(args[1])) return message.reply("Please buy something valid.")
            let nb = 2 * args[2]
            let w = await db.get(`economy_user_${target.id}.bank`)
            if(w < nb) return message.reply("You don't have enough money.")
            await db.add(`economy_user_${target.id}.inv.${args[1]}`, nb)
            await db.sub(`economy_user_${target.id}.bank`, 2 * args[2])
            const embed = new Discord.MessageEmbed()
                .setColor('WHITE')
                .setTitle(`Shop - ${message.guild.name}`)
                .setDescription(`You have just bought \`${nb} ${capitalizeFirstLetter(args[1])}\` and you have lost \`$${2*args[2]}\``)
            return message.channel.send({
                embeds: [embed]
            })
        }

        let sellable = ["wheat", "bread", "gold_ore", "gold_ingot", "fish", "coocked_fish"]
        if (args[0] == "sell") {
            if (!args[1] && !args[2]) return message.reply("Please specify the item and quantity.")
            if (!sellable.includes(args[1])) return message.reply("Please sell something valid.")
            let nb = args[2]
            if(args[1] == "wheat") {
                let w = await db.get(`economy_user_${target.id}.inv.${args[1]}`)
                if(w < args[2]) return message.reply("You don't have enough "+ args[1]+ '.')
                if (day == 0 || day == 3 || day == 6) {
                    await db.sub(`economy_user_${target.id}.inv.${args[1]}`, nb)
                    await db.add(`economy_user_${target.id}.bag`, sell1.wheat * args[2])
                    const embed = new Discord.MessageEmbed()
                        .setColor('WHITE')
                        .setTitle(`Shop - ${message.guild.name}`)
                        .setDescription(`You sold \`${nb} wheat\`, you win \`$${sell1.wheat * args[2]}\``)
                    return message.channel.send({
                        embeds: [embed]
                    })
                } else if (day == 1 || day == 2 || day == 5) {
                    await db.sub(`economy_user_${target.id}.inv.${args[1]}`, nb)
                    await db.add(`economy_user_${target.id}.bag`, sell2.wheat * args[2])
                    const embed = new Discord.MessageEmbed()
                        .setColor('WHITE')
                        .setTitle(`Shop - ${message.guild.name}`)
                        .setDescription(`You sold \`${nb} wheat\`, you win \`$${sell2.wheat * args[2]}\``)
                    return message.channel.send({
                        embeds: [embed]
                    })
                } else if (day == 4) {
                    await db.sub(`economy_user_${target.id}.inv.${args[1]}`, nb)
                    await db.add(`economy_user_${target.id}.bag`, sell3.wheat * args[2])
                    const embed = new Discord.MessageEmbed()
                        .setColor('WHITE')
                        .setTitle(`Shop - ${message.guild.name}`)
                        .setDescription(`You sold \`${nb} wheat\`, you win \`$${sell3.wheat * args[2]}\``)
                    return message.channel.send({
                        embeds: [embed]
                    })
                }
            }
            if(args[1] == "bread") {
                let w = await db.get(`economy_user_${target.id}.inv.${args[1]}`)
                if(w < args[2]) return message.reply("You don't have enough "+ args[1]+ '.')
                if (day == 0 || day == 3 || day == 6) {
                    await db.sub(`economy_user_${target.id}.inv.${args[1]}`, nb)
                    await db.add(`economy_user_${target.id}.bag`, sell1.bread * args[2])
                    const embed = new Discord.MessageEmbed()
                        .setColor('WHITE')
                        .setTitle(`Shop - ${message.guild.name}`)
                        .setDescription(`You sold \`${nb} bread\`, you win \`$${sell1.bread * args[2]}\``)
                    return message.channel.send({
                        embeds: [embed]
                    })
                } else if (day == 1 || day == 2 || day == 5) {
                    await db.sub(`economy_user_${target.id}.inv.${args[1]}`, nb)
                    await db.add(`economy_user_${target.id}.bag`, sell2.bread * args[2])
                    const embed = new Discord.MessageEmbed()
                        .setColor('WHITE')
                        .setTitle(`Shop - ${message.guild.name}`)
                        .setDescription(`You sold \`${nb} bread\`, you win \`$${sell2.bread * args[2]}\``)
                    return message.channel.send({
                        embeds: [embed]
                    })
                } else if (day == 4) {
                    await db.sub(`economy_user_${target.id}.inv.${args[1]}`, nb)
                    await db.add(`economy_user_${target.id}.bag`, sell3.bread * args[2])
                    const embed = new Discord.MessageEmbed()
                        .setColor('WHITE')
                        .setTitle(`Shop - ${message.guild.name}`)
                        .setDescription(`You sold \`${nb} bread\`, you win \`$${sell3.bread * args[2]}\``)
                    return message.channel.send({
                        embeds: [embed]
                    })
                }
            }
            if(args[1] == "gold_ore") {
                let w = await db.get(`economy_user_${target.id}.inv.${args[1]}`)
                if(w < args[2]) return message.reply("You don't have enough "+ args[1]+ '.')
                if (day == 0 || day == 3 || day == 6) {
                    await db.sub(`economy_user_${target.id}.inv.${args[1]}`, nb)
                    await db.add(`economy_user_${target.id}.bag`, sell1.gold_ore * args[2])
                    const embed = new Discord.MessageEmbed()
                        .setColor('WHITE')
                        .setTitle(`Shop - ${message.guild.name}`)
                        .setDescription(`You sold \`${nb} gold ore\`, you win \`$${sell1.gold_ore * args[2]}\``)
                    return message.channel.send({
                        embeds: [embed]
                    })
                } else if (day == 1 || day == 2 || day == 5) {
                    await db.sub(`economy_user_${target.id}.inv.${args[1]}`, nb)
                    await db.add(`economy_user_${target.id}.bag`, sell2.gold_ore * args[2])
                    const embed = new Discord.MessageEmbed()
                        .setColor('WHITE')
                        .setTitle(`Shop - ${message.guild.name}`)
                        .setDescription(`You sold \`${nb} gold ore\`, you win \`$${sell2.gold_ore * args[2]}\``)
                    return message.channel.send({
                        embeds: [embed]
                    })
                } else if (day == 4) {
                    await db.sub(`economy_user_${target.id}.inv.${args[1]}`, nb)
                    await db.add(`economy_user_${target.id}.bag`, sell3.gold_ore * args[2])
                    const embed = new Discord.MessageEmbed()
                        .setColor('WHITE')
                        .setTitle(`Shop - ${message.guild.name}`)
                        .setDescription(`You sold \`${nb} gold ore\`, you win \`$${sell3.gold_ore * args[2]}\``)
                    return message.channel.send({
                        embeds: [embed]
                    })
                }
            }
            if(args[1] == "gold_ingot") {
                let w = await db.get(`economy_user_${target.id}.inv.${args[1]}`)
                if(w < args[2]) return message.reply("You don't have enough "+ args[1]+ '.')
                if (day == 0 || day == 3 || day == 6) {
                    await db.sub(`economy_user_${target.id}.inv.${args[1]}`, nb)
                    await db.add(`economy_user_${target.id}.bag`, sell1.gold_ingot * args[2])
                    const embed = new Discord.MessageEmbed()
                        .setColor('WHITE')
                        .setTitle(`Shop - ${message.guild.name}`)
                        .setDescription(`You sold \`${nb} gold ingot\`, you win \`$${sell1.gold_ingot * args[2]}\``)
                    return message.channel.send({
                        embeds: [embed]
                    })
                } else if (day == 1 || day == 2 || day == 5) {
                    await db.sub(`economy_user_${target.id}.inv.${args[1]}`, nb)
                    await db.add(`economy_user_${target.id}.bag`, sell2.gold_ingot * args[2])
                    const embed = new Discord.MessageEmbed()
                        .setColor('WHITE')
                        .setTitle(`Shop - ${message.guild.name}`)
                        .setDescription(`You sold \`${nb} gold ingot\`, you win \`$${sell2.gold_ingot * args[2]}\``)
                    return message.channel.send({
                        embeds: [embed]
                    })
                } else if (day == 4) {
                    await db.sub(`economy_user_${target.id}.inv.${args[1]}`, nb)
                    await db.add(`economy_user_${target.id}.bag`, sell3.gold_ingot * args[2])
                    const embed = new Discord.MessageEmbed()
                        .setColor('WHITE')
                        .setTitle(`Shop - ${message.guild.name}`)
                        .setDescription(`You sold \`${nb} gold ingot\`, you win \`$${sell3.gold_ingot * args[2]}\``)
                    return message.channel.send({
                        embeds: [embed]
                    })
                }
            }
            if(args[1] == "fish") {
                let w = await db.get(`economy_user_${target.id}.inv.${args[1]}`)
                if(w < args[2]) return message.reply("You don't have enough "+ args[1]+ '.')
                if (day == 0 || day == 3 || day == 6) {
                    await db.sub(`economy_user_${target.id}.inv.${args[1]}`, nb)
                    await db.add(`economy_user_${target.id}.bag`, sell1.fish * args[2])
                    const embed = new Discord.MessageEmbed()
                        .setColor('WHITE')
                        .setTitle(`Shop - ${message.guild.name}`)
                        .setDescription(`You sold \`${nb} fish\`, you win \`$${sell1.fish * args[2]}\``)
                    return message.channel.send({
                        embeds: [embed]
                    })
                } else if (day == 1 || day == 2 || day == 5) {
                    await db.sub(`economy_user_${target.id}.inv.${args[1]}`, nb)
                    await db.add(`economy_user_${target.id}.bag`, sell2.fish * args[2])
                    const embed = new Discord.MessageEmbed()
                        .setColor('WHITE')
                        .setTitle(`Shop - ${message.guild.name}`)
                        .setDescription(`You sold \`${nb} fish\`, you win \`$${sell2.fish * args[2]}\``)
                    return message.channel.send({
                        embeds: [embed]
                    })
                } else if (day == 4) {
                    await db.sub(`economy_user_${target.id}.inv.${args[1]}`, nb)
                    await db.add(`economy_user_${target.id}.bag`, sell3.fish * args[2])
                    const embed = new Discord.MessageEmbed()
                        .setColor('WHITE')
                        .setTitle(`Shop - ${message.guild.name}`)
                        .setDescription(`You sold \`${nb} fish\`, you win \`$${sell3.fish * args[2]}\``)
                    return message.channel.send({
                        embeds: [embed]
                    })
                }
            }
            if(args[1] == "coocked_fish") {
                let w = await db.get(`economy_user_${target.id}.inv.${args[1]}`)
                if(w < args[2]) return message.reply("You don't have enough "+ args[1]+ '.')
                if (day == 0 || day == 3 || day == 6) {
                    await db.sub(`economy_user_${target.id}.inv.${args[1]}`, nb)
                    await db.add(`economy_user_${target.id}.bag`, sell1.coocked_fish * args[2])
                    const embed = new Discord.MessageEmbed()
                        .setColor('WHITE')
                        .setTitle(`Shop - ${message.guild.name}`)
                        .setDescription(`You sold \`${nb} coocked fish\`, you win \`$${sell1.coocked_fish * args[2]}\``)
                    return message.channel.send({
                        embeds: [embed]
                    })
                } else if (day == 1 || day == 2 || day == 5) {
                    await db.sub(`economy_user_${target.id}.inv.${args[1]}`, nb)
                    await db.add(`economy_user_${target.id}.bag`, sell2.coocked_fish * args[2])
                    const embed = new Discord.MessageEmbed()
                        .setColor('WHITE')
                        .setTitle(`Shop - ${message.guild.name}`)
                        .setDescription(`You sold \`${nb} coocked fish\`, you win \`$${sell2.coocked_fish * args[2]}\``)
                    return message.channel.send({
                        embeds: [embed]
                    })
                } else if (day == 4) {
                    await db.sub(`economy_user_${target.id}.inv.${args[1]}`, nb)
                    await db.add(`economy_user_${target.id}.bag`, sell3.coocked_fish * args[2])
                    const embed = new Discord.MessageEmbed()
                        .setColor('WHITE')
                        .setTitle(`Shop - ${message.guild.name}`)
                        .setDescription(`You sold \`${nb} coocked fish\`, you win \`$${sell3.coocked_fish * args[2]}\``)
                    return message.channel.send({
                        embeds: [embed]
                    })
                }
            }
        }
    },
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

