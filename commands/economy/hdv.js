const Discord = require("discord.js");
const {
    QuickDB
} = require('quick.db')
module.exports = {
    name: "hdv",
    aliases: ["", "", ""],
    cooldowns: 3000,
    description: "Change your job here",
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

        const embed = new Discord.MessageEmbed()
            .setColor("NAVY")
            .setTitle(`HDV - ${message.guild.name}`)
            .addField(`Farmer`, `\`$25\` - Sell your wheat or bread.`, true)
            .addField(`Miner`, `\`$45\` - Sell your Gold or Gold Ingots.`, true)
            .addField(`Fisherman`, `\`$70\` - Sell your fish or a dish.`, true)
            .addField(`Policeman`, `\`$105\` - Make the law in the city.`, true)
            .addField(`Scientific`, `\`$135\` - Create things for the world.`, true)
            .addField(`Banker`, `\`$160\` - Win interests.`, true)
            .addField(`Musician`, `\`$320\` - Make concerts.`, true)
        let msg = await message.channel.send({
            embeds: [embed]
        })
        await msg.react('🌽')
        await msg.react('⛏')
        await msg.react('🐟')
        await msg.react('👮‍♂️')
        await msg.react('🧬')
        await msg.react('💰')
        await msg.react('🎙')

        let collector = msg.createReactionCollector(
            (reaction, user) => user.id === message.author.id
        );
        let bank = await db.get(`economy_user_${target.id}.bank`)
        let job = await db.get(`economy_user_${target.id}.job`)
        collector.on("collect", async (reaction, user) => {
            if (reaction._emoji.name === "🌽") {
                if (job != "farmer") {
                    if (bank >= 25) {
                        await msg.reactions.removeAll().catch()
                        const emb = new Discord.MessageEmbed()
                            .setColor("NAVY")
                            .setTitle(`HDV - ${message.guild.name}`)
                            .setDescription(`${target}, do you really want to be a farmer?`)
                        let msga = await msg.edit({
                            embeds: [emb]
                        })
                        await msga.react('✅')
                        await msga.react('❌')

                        let collectora = msga.createReactionCollector(
                            (reaction, user) => user.id === message.author.id
                        );
                        collectora.on("collect", async (reaction, user) => {
                            if (reaction._emoji.name === "✅") {
                                await msga.reactions.removeAll().catch()
                                await db.sub(`economy_user_${target.id}.bank`, 25)
                                await db.set(`economy_user_${target.id}.job`, "farmer")
                                await db.set(`economy_user_${target.id}.rob`, true)
                                const embOk = new Discord.MessageEmbed()
                                    .setColor('GREEN')
                                    .setTitle(`HDV - ${message.guild.name}`)
                                    .setDescription(`You have become a \`Farmer\``)
                                    .setTimestamp()
                                return msg.edit({
                                    embeds: [embOk]
                                })
                            } else if (reaction._emoji.name === "❌") {
                                await msga.reactions.removeAll().catch()
                                const embOk = new Discord.MessageEmbed()
                                    .setColor('RED')
                                    .setTitle(`HDV - ${message.guild.name}`)
                                    .setDescription(`Canceled!`)
                                    .setTimestamp()
                                return msg.edit({
                                    embeds: [embOk]
                                })
                            }
                        })

                    } else {
                        const embNo = new Discord.MessageEmbed()
                            .setColor('RED')
                            .setTitle(`HDV - ${message.guild.name}`)
                            .setDescription(`${target}, you do not have enough money.`)
                            .setTimestamp()
                        return msg.edit({
                            embeds: [embNo]
                        })
                    }
                } else {
                    const embJo = new Discord.MessageEmbed()
                        .setColor('RED')
                        .setTitle(`HDV - ${message.guild.name}`)
                        .setDescription(`${target}, you already have this job.`)
                        .setTimestamp()
                    return msg.edit({
                        embeds: [embJo]
                    })
                }

            } else if (reaction._emoji.name === "⛏") {
                if (job != "miner") {
                    if (bank >= 45) {
                        await msg.reactions.removeAll().catch()
                        const emb = new Discord.MessageEmbed()
                            .setColor("NAVY")
                            .setTitle(`HDV - ${message.guild.name}`)
                            .setDescription(`${target}, do you really want to be a miner?`)
                        let msga = await msg.edit({
                            embeds: [emb]
                        })
                        await msga.react('✅')
                        await msga.react('❌')

                        let collectora = msga.createReactionCollector(
                            (reaction, user) => user.id === message.author.id
                        );
                        collectora.on("collect", async (reaction, user) => {
                            if (reaction._emoji.name === "✅") {
                                await msga.reactions.removeAll().catch()
                                await db.sub(`economy_user_${target.id}.bank`, 45)
                                await db.set(`economy_user_${target.id}.job`, "miner")
                                await db.set(`economy_user_${target.id}.rob`, true)
                                const embOk = new Discord.MessageEmbed()
                                    .setColor('GREEN')
                                    .setTitle(`HDV - ${message.guild.name}`)
                                    .setDescription(`You have become a \`Miner\``)
                                    .setTimestamp()
                                return msg.edit({
                                    embeds: [embOk]
                                })
                            } else if (reaction._emoji.name === "❌") {
                                await msga.reactions.removeAll().catch()
                                const embOk = new Discord.MessageEmbed()
                                    .setColor('RED')
                                    .setTitle(`HDV - ${message.guild.name}`)
                                    .setDescription(`Canceled!`)
                                    .setTimestamp()
                                return msg.edit({
                                    embeds: [embOk]
                                })
                            }
                        })

                    } else {
                        const embNo = new Discord.MessageEmbed()
                            .setColor('RED')
                            .setTitle(`HDV - ${message.guild.name}`)
                            .setDescription(`${target}, you do not have enough money.`)
                            .setTimestamp()
                        return msg.edit({
                            embeds: [embNo]
                        })
                    }
                } else {
                    const embJo = new Discord.MessageEmbed()
                        .setColor('RED')
                        .setTitle(`HDV - ${message.guild.name}`)
                        .setDescription(`${target}, you already have this job.`)
                        .setTimestamp()
                    return msg.edit({
                        embeds: [embJo]
                    })
                }
            } else if (reaction._emoji.name === "🐟") {
                if (job != "fisherman") {
                    if (bank >= 70) {
                        await msg.reactions.removeAll().catch()
                        const emb = new Discord.MessageEmbed()
                            .setColor("NAVY")
                            .setTitle(`HDV - ${message.guild.name}`)
                            .setDescription(`${target}, do you really want to be a fisherman?`)
                        let msga = await msg.edit({
                            embeds: [emb]
                        })
                        await msga.react('✅')
                        await msga.react('❌')

                        let collectora = msga.createReactionCollector(
                            (reaction, user) => user.id === message.author.id
                        );
                        collectora.on("collect", async (reaction, user) => {
                            if (reaction._emoji.name === "✅") {
                                await msga.reactions.removeAll().catch()
                                await db.sub(`economy_user_${target.id}.bank`, 70)
                                await db.set(`economy_user_${target.id}.job`, "fisherman")
                                await db.set(`economy_user_${target.id}.rob`, true)
                                const embOk = new Discord.MessageEmbed()
                                    .setColor('GREEN')
                                    .setTitle(`HDV - ${message.guild.name}`)
                                    .setDescription(`You have become a \`Fisherman\``)
                                    .setTimestamp()
                                return msg.edit({
                                    embeds: [embOk]
                                })
                            } else if (reaction._emoji.name === "❌") {
                                await msga.reactions.removeAll().catch()
                                const embOk = new Discord.MessageEmbed()
                                    .setColor('RED')
                                    .setTitle(`HDV - ${message.guild.name}`)
                                    .setDescription(`Canceled!`)
                                    .setTimestamp()
                                return msg.edit({
                                    embeds: [embOk]
                                })
                            }
                        })

                    } else {
                        const embNo = new Discord.MessageEmbed()
                            .setColor('RED')
                            .setTitle(`HDV - ${message.guild.name}`)
                            .setDescription(`${target}, you do not have enough money.`)
                            .setTimestamp()
                        return msg.edit({
                            embeds: [embNo]
                        })
                    }
                } else {
                    const embJo = new Discord.MessageEmbed()
                        .setColor('RED')
                        .setTitle(`HDV - ${message.guild.name}`)
                        .setDescription(`${target}, you already have this job.`)
                        .setTimestamp()
                    return msg.edit({
                        embeds: [embJo]
                    })
                }
            } else if (reaction._emoji.name === "👮‍♂️") {
                if (job != "policeman") {
                    if (bank >= 105) {
                        await msg.reactions.removeAll().catch()
                        const emb = new Discord.MessageEmbed()
                            .setColor("NAVY")
                            .setTitle(`HDV - ${message.guild.name}`)
                            .setDescription(`${target}, do you really want to be a policeman?`)
                        let msga = await msg.edit({
                            embeds: [emb]
                        })
                        await msga.react('✅')
                        await msga.react('❌')

                        let collectora = msga.createReactionCollector(
                            (reaction, user) => user.id === message.author.id
                        );
                        collectora.on("collect", async (reaction, user) => {
                            if (reaction._emoji.name === "✅") {
                                await msga.reactions.removeAll().catch()
                                await db.sub(`economy_user_${target.id}.bank`, 105)
                                await db.set(`economy_user_${target.id}.job`, "policeman")
                                await db.set(`economy_user_${target.id}.rob`, false)
                                const embOk = new Discord.MessageEmbed()
                                    .setColor('GREEN')
                                    .setTitle(`HDV - ${message.guild.name}`)
                                    .setDescription(`You have become a \`Policeman\``)
                                    .setTimestamp()
                                return msg.edit({
                                    embeds: [embOk]
                                })
                            } else if (reaction._emoji.name === "❌") {
                                await msga.reactions.removeAll().catch()
                                const embOk = new Discord.MessageEmbed()
                                    .setColor('RED')
                                    .setTitle(`HDV - ${message.guild.name}`)
                                    .setDescription(`Canceled!`)
                                    .setTimestamp()
                                return msg.edit({
                                    embeds: [embOk]
                                })
                            }
                        })

                    } else {
                        const embNo = new Discord.MessageEmbed()
                            .setColor('RED')
                            .setTitle(`HDV - ${message.guild.name}`)
                            .setDescription(`${target}, you do not have enough money.`)
                            .setTimestamp()
                        return msg.edit({
                            embeds: [embNo]
                        })
                    }
                } else {
                    const embJo = new Discord.MessageEmbed()
                        .setColor('RED')
                        .setTitle(`HDV - ${message.guild.name}`)
                        .setDescription(`${target}, you already have this job.`)
                        .setTimestamp()
                    return msg.edit({
                        embeds: [embJo]
                    })
                }
            } else if (reaction._emoji.name === "🧬") {
                if (job != "scientific") {
                    if (bank >= 135) {
                        await msg.reactions.removeAll().catch()
                        const emb = new Discord.MessageEmbed()
                            .setColor("NAVY")
                            .setTitle(`HDV - ${message.guild.name}`)
                            .setDescription(`${target}, do you really want to be a scientific?`)
                        let msga = await msg.edit({
                            embeds: [emb]
                        })
                        await msga.react('✅')
                        await msga.react('❌')

                        let collectora = msga.createReactionCollector(
                            (reaction, user) => user.id === message.author.id
                        );
                        collectora.on("collect", async (reaction, user) => {
                            if (reaction._emoji.name === "✅") {
                                await msga.reactions.removeAll().catch()
                                await db.sub(`economy_user_${target.id}.bank`, 135)
                                await db.set(`economy_user_${target.id}.job`, "scientific")
                                await db.set(`economy_user_${target.id}.rob`, true)
                                const embOk = new Discord.MessageEmbed()
                                    .setColor('GREEN')
                                    .setTitle(`HDV - ${message.guild.name}`)
                                    .setDescription(`You have become a \`Scientific\``)
                                    .setTimestamp()
                                return msg.edit({
                                    embeds: [embOk]
                                })
                            } else if (reaction._emoji.name === "❌") {
                                await msga.reactions.removeAll().catch()
                                const embOk = new Discord.MessageEmbed()
                                    .setColor('RED')
                                    .setTitle(`HDV - ${message.guild.name}`)
                                    .setDescription(`Canceled!`)
                                    .setTimestamp()
                                return msg.edit({
                                    embeds: [embOk]
                                })
                            }
                        })

                    } else {
                        const embNo = new Discord.MessageEmbed()
                            .setColor('RED')
                            .setTitle(`HDV - ${message.guild.name}`)
                            .setDescription(`${target}, you do not have enough money.`)
                            .setTimestamp()
                        return msg.edit({
                            embeds: [embNo]
                        })
                    }
                } else {
                    const embJo = new Discord.MessageEmbed()
                        .setColor('RED')
                        .setTitle(`HDV - ${message.guild.name}`)
                        .setDescription(`${target}, you already have this job.`)
                        .setTimestamp()
                    return msg.edit({
                        embeds: [embJo]
                    })
                }
            } else if (reaction._emoji.name === "💰") {
                if (job != "banker") {
                    if (bank >= 160) {
                        await msg.reactions.removeAll().catch()
                        const emb = new Discord.MessageEmbed()
                            .setColor("NAVY")
                            .setTitle(`HDV - ${message.guild.name}`)
                            .setDescription(`${target}, do you really want to be a banker?`)
                        let msga = await msg.edit({
                            embeds: [emb]
                        })
                        await msga.react('✅')
                        await msga.react('❌')

                        let collectora = msga.createReactionCollector(
                            (reaction, user) => user.id === message.author.id
                        );
                        collectora.on("collect", async (reaction, user) => {
                            if (reaction._emoji.name === "✅") {
                                await msga.reactions.removeAll().catch()
                                await db.sub(`economy_user_${target.id}.bank`, 160)
                                await db.set(`economy_user_${target.id}.job`, "banker")
                                await db.set(`economy_user_${target.id}.rob`, true)
                                const embOk = new Discord.MessageEmbed()
                                    .setColor('GREEN')
                                    .setTitle(`HDV - ${message.guild.name}`)
                                    .setDescription(`You have become a \`Banker\``)
                                    .setTimestamp()
                                return msg.edit({
                                    embeds: [embOk]
                                })
                            } else if (reaction._emoji.name === "❌") {
                                await msga.reactions.removeAll().catch()
                                const embOk = new Discord.MessageEmbed()
                                    .setColor('RED')
                                    .setTitle(`HDV - ${message.guild.name}`)
                                    .setDescription(`Canceled!`)
                                    .setTimestamp()
                                return msg.edit({
                                    embeds: [embOk]
                                })
                            }
                        })

                    } else {
                        const embNo = new Discord.MessageEmbed()
                            .setColor('RED')
                            .setTitle(`HDV - ${message.guild.name}`)
                            .setDescription(`${target}, you do not have enough money.`)
                            .setTimestamp()
                        return msg.edit({
                            embeds: [embNo]
                        })
                    }
                } else {
                    const embJo = new Discord.MessageEmbed()
                        .setColor('RED')
                        .setTitle(`HDV - ${message.guild.name}`)
                        .setDescription(`${target}, you already have this job.`)
                        .setTimestamp()
                    return msg.edit({
                        embeds: [embJo]
                    })
                }
            } else if (reaction._emoji.name === "🎙") {
                if (job != "musician") {
                    if (bank >= 320) {
                        await msg.reactions.removeAll().catch()
                        const emb = new Discord.MessageEmbed()
                            .setColor("NAVY")
                            .setTitle(`HDV - ${message.guild.name}`)
                            .setDescription(`${target}, do you really want to be a musician?`)
                        let msga = await msg.edit({
                            embeds: [emb]
                        })
                        await msga.react('✅')
                        await msga.react('❌')

                        let collectora = msga.createReactionCollector(
                            (reaction, user) => user.id === message.author.id
                        );
                        collectora.on("collect", async (reaction, user) => {
                            if (reaction._emoji.name === "✅") {
                                await msga.reactions.removeAll().catch()
                                await db.sub(`economy_user_${target.id}.bank`, 320)
                                await db.set(`economy_user_${target.id}.job`, "musician")
                                await db.set(`economy_user_${target.id}.rob`, true)
                                const embOk = new Discord.MessageEmbed()
                                    .setColor('GREEN')
                                    .setTitle(`HDV - ${message.guild.name}`)
                                    .setDescription(`You have become a \`Musician\``)
                                    .setTimestamp()
                                return msg.edit({
                                    embeds: [embOk]
                                })
                            } else if (reaction._emoji.name === "❌") {
                                await msga.reactions.removeAll().catch()
                                const embOk = new Discord.MessageEmbed()
                                    .setColor('RED')
                                    .setTitle(`HDV - ${message.guild.name}`)
                                    .setDescription(`Canceled!`)
                                    .setTimestamp()
                                return msg.edit({
                                    embeds: [embOk]
                                })
                            }
                        })

                    } else {
                        const embNo = new Discord.MessageEmbed()
                            .setColor('RED')
                            .setTitle(`HDV - ${message.guild.name}`)
                            .setDescription(`${target}, you do not have enough money.`)
                            .setTimestamp()
                        return msg.edit({
                            embeds: [embNo]
                        })
                    }
                } else {
                    const embJo = new Discord.MessageEmbed()
                        .setColor('RED')
                        .setTitle(`HDV - ${message.guild.name}`)
                        .setDescription(`${target}, you already have this job.`)
                        .setTimestamp()
                    return msg.edit({
                        embeds: [embJo]
                    })
                }
            }
        })


    },
};