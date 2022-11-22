const Discord = require("discord.js");
const {
    QuickDB
} = require('quick.db')
const ms = require('ms')
module.exports = {
    name: "job",
    aliases: ["", "", ""],
    cooldowns: 3000,
    description: "Work for win a money",
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

        let lastDaily = await db.get(`economy_user_${target.id}.job-d`);
        let cooldown = 86400000; // 24 hours in ms

        if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
            const timeLeftRep = ms(cooldown - (Date.now() - lastDaily))
            const emd = new Discord.MessageEmbed()
                .setColor('RED')
                .setTitle(`Job - ${message.guild.name}`)
                .setDescription(`${target} have to wait again \`${timeLeftRep}\``)
            return message.reply({
                embeds: [emd]
            })
        } else {
            let job = await db.get(`economy_user_${target.id}.job`)
            if (job == "farmer") { // Farmer finish
                await db.add(`economy_user_${target.id}.job-7`, 1)
                let jn = await db.get(`economy_user_${target.id}.job-7`)
                let j = 7 - jn;
                if (j == 0) {
                    let random = Math.floor(Math.random() * 5) + Math.floor(Math.random() * 3) + 2
                    let win = random * 0.5 + random
                    await db.add(`economy_user_${target.id}.inv.wheat`, win.toFixed(0))
                    const emb = new Discord.MessageEmbed()
                        .setColor('YELLOW')
                        .setTitle(`Farmer - ${message.author.username}`)
                        .setDescription(`The big harvest has just passed, you won \`${win.toFixed(0)} wheat\``)
                    await db.set(`economy_user_${target.id}.job-d`, Date.now());
                    await db.set(`economy_user_${target.id}.job-7`, 0)
                    return message.channel.send({
                        embeds: [emb]
                    })
                }
                let random = Math.floor(Math.random() * 5) + Math.floor(Math.random() * 3) + 2
                await db.add(`economy_user_${target.id}.inv.wheat`, random)
                const emb = new Discord.MessageEmbed()
                    .setColor('YELLOW')
                    .setTitle(`Farmer - ${message.author.username}`)
                    .setDescription(`You have just harvested \`${random.toFixed(0)} wheat\`\nYou have \`${j} days\` left before the big harvest.`)
                await db.set(`economy_user_${target.id}.job-d`, Date.now());
                return message.channel.send({
                    embeds: [emb]
                })
            } else if (job == "miner") { // Miner finish
                await db.add(`economy_user_${target.id}.job-7`, 1)
                let jn = await db.get(`economy_user_${target.id}.job-7`)
                let j = 7 - jn;
                if (j == 0) {
                    let random = Math.floor(Math.random() * 5) + Math.floor(Math.random() * 3) + 2
                    let win = random * 0.5 + random
                    await db.add(`economy_user_${target.id}.inv.gold_ore`, win.toFixed(0))
                    const emb = new Discord.MessageEmbed()
                        .setColor('GREY')
                        .setTitle(`Miner - ${message.author.username}`)
                        .setDescription(`You were more likely, you won \`${win.toFixed(0)} Gold\`.`)
                    await db.set(`economy_user_${target.id}.job-d`, Date.now());
                    await db.set(`economy_user_${target.id}.job-7`, 0)
                    return message.channel.send({
                        embeds: [emb]
                    })
                }
                let random = Math.floor(Math.random() * 5) + Math.floor(Math.random() * 3) + 2
                await db.add(`economy_user_${target.id}.inv.gold_ore`, random.toFixed(0))
                const emb = new Discord.MessageEmbed()
                    .setColor('GREY')
                    .setTitle(`Miner - ${message.author.username}`)
                    .setDescription(`You have recovered \`${random.toFixed(0)} Gold\`,\nyour luck will increase in \`${j} days\`.`)
                await db.set(`economy_user_${target.id}.job-d`, Date.now());
                return message.channel.send({
                    embeds: [emb]
                })
            } else if (job == "fisherman") { // Fisherman finish
                await db.add(`economy_user_${target.id}.job-7`, 1)
                let jn = await db.get(`economy_user_${target.id}.job-7`)
                let j = 7 - jn;
                if (j == 0) {
                    let random = Math.floor(Math.random() * 5) + Math.floor(Math.random() * 3) + 2
                    let win = random * 0.5 + random
                    await db.add(`economy_user_${target.id}.inv.fish`, win.toFixed(0))
                    const emb = new Discord.MessageEmbed()
                        .setColor('AQUA')
                        .setTitle(`Fisherman - ${message.author.username}`)
                        .setDescription(`You have found \`${win.toFixed(0)} fish\` with your hook to improve.`)
                    await db.set(`economy_user_${target.id}.job-d`, Date.now());
                    await db.set(`economy_user_${target.id}.job-7`, 0)
                    return message.channel.send({
                        embeds: [emb]
                    })
                }
                let random = Math.floor(Math.random() * 5) + Math.floor(Math.random() * 3) + 2
                await db.add(`economy_user_${target.id}.inv.fish`, random.toFixed(0))
                const emb = new Discord.MessageEmbed()
                    .setColor('AQUA')
                    .setTitle(`Fisherman - ${message.author.username}`)
                    .setDescription(`You have found \`${random.toFixed(0)} fish\`,\nyour improvement hook will be available in \`${j} days\`.`)
                await db.set(`economy_user_${target.id}.job-d`, Date.now());
                return message.channel.send({
                    embeds: [emb]
                })
            } else if (job == "policeman") { // Policeman finish
                await db.add(`economy_user_${target.id}.job-7`, 1)
                let jn = await db.get(`economy_user_${target.id}.job-7`)
                let j = 7 - jn;
                if (j == 0) {
                    let random = Math.floor(Math.random() * 5) + Math.floor(Math.random() * 2) + 15
                    let win = random * 0.5 + random
                    await db.add(`economy_user_${target.id}.bank`, win.toFixed(0))
                    const emb = new Discord.MessageEmbed()
                        .setColor('GREY')
                        .setTitle(`Policeman - ${message.author.username}`)
                        .setDescription(`You have managed to stop a gang, the boss gives you \`$${win.toFixed(0)}\` as a bonus.`)
                    await db.set(`economy_user_${target.id}.job-d`, Date.now());
                    await db.set(`economy_user_${target.id}.job-7`, 0)
                    return message.channel.send({
                        embeds: [emb]
                    })
                }
                let random = Math.floor(Math.random() * 5) + Math.floor(Math.random() * 2) + 15
                await db.add(`economy_user_${target.id}.bank`, random.toFixed(0))
                const emb = new Discord.MessageEmbed()
                    .setColor('GREY')
                    .setTitle(`Policeman - ${message.author.username}`)
                    .setDescription(`You have helped the city, you earn \`$${random.toFixed(0)}\`.\nA gang will be there in \`${j} days\` to kill you.`)
                await db.set(`economy_user_${target.id}.job-d`, Date.now());
                return message.channel.send({
                    embeds: [emb]
                })
            } else if (job == "scientific") { // Scientific finish
                await db.add(`economy_user_${target.id}.job-7`, 1)
                let jn = await db.get(`economy_user_${target.id}.job-7`)
                let j = 7 - jn;
                if (j == 0) {
                    let random = Math.floor(Math.random() * 5) + Math.floor(Math.random() * 6) + 17
                    let win = random * 0.5 + random
                    await db.add(`economy_user_${target.id}.bank`, win.toFixed(0))
                    const emb = new Discord.MessageEmbed()
                        .setColor('WHITE')
                        .setTitle(`Scientific - ${message.author.username}`)
                        .setDescription(`NASA thanks you for helping so much, you win \`$${win.toFixed(0)}\`.`)
                    await db.set(`economy_user_${target.id}.job-d`, Date.now());
                    await db.set(`economy_user_${target.id}.job-7`, 0)
                    return message.channel.send({
                        embeds: [emb]
                    })
                }
                let random = Math.floor(Math.random() * 5) + Math.floor(Math.random() * 6) + 17
                await db.add(`economy_user_${target.id}.bank`, random.toFixed(0))
                const emb = new Discord.MessageEmbed()
                    .setColor('WHITE')
                    .setTitle(`Scientific - ${message.author.username}`)
                    .setDescription(`You have just discovered something that will advance the world, you win \`$${random.toFixed(0)}\`.\nIn \`${j} days\` you have an appointment with NASA.`)
                await db.set(`economy_user_${target.id}.job-d`, Date.now());
                return message.channel.send({
                    embeds: [emb]
                })
            } else if (job == "banker") { // Banker finish
                await db.add(`economy_user_${target.id}.job-7`, 1)
                let jn = await db.get(`economy_user_${target.id}.job-7`)
                let j = 7 - jn;
                if (j == 0) {
                    let random = (Math.floor(Math.random() * 75) + 17)/2
                    let win = random * 0.5 + random
                    await db.add(`economy_user_${target.id}.bank`, win.toFixed(0))
                    const emb = new Discord.MessageEmbed()
                        .setColor('DARK_GOLD')
                        .setTitle(`Banker - ${message.author.username}`)
                        .setDescription(`The interests worked well, you have won \`$${win.toFixed(0)}\`.`)
                    await db.set(`economy_user_${target.id}.job-d`, Date.now());
                    await db.set(`economy_user_${target.id}.job-7`, 0)
                    return message.channel.send({
                        embeds: [emb]
                    })
                }
                let random = (Math.floor(Math.random() * 75) + 17)/2
                await db.add(`economy_user_${target.id}.bank`, random.toFixed(0))
                const emb = new Discord.MessageEmbed()
                    .setColor('DARK_GOLD')
                    .setTitle(`Banker - ${message.author.username}`)
                    .setDescription(`The interests made you win \`$${random.toFixed(0)}\`.\nIn \`${j} days\` there is an increase in interests.`)
                await db.set(`economy_user_${target.id}.job-d`, Date.now());
                return message.channel.send({
                    embeds: [emb]
                })
            } else if (job == "musician") {
                await db.add(`economy_user_${target.id}.job-7`, 1)
                let jn = await db.get(`economy_user_${target.id}.job-7`)
                let j = 7 - jn;
                if (j == 0) {
                    let win = Math.floor(Math.random() * 350) + 100
                    await db.add(`economy_user_${target.id}.bank`, win.toFixed(0))
                    const emb = new Discord.MessageEmbed()
                        .setColor('FUCHSIA')
                        .setTitle(`Musician - ${message.author.username}`)
                        .setDescription(`Your concert has made a thunder, you have won \`$${win.toFixed(0)}\`.`)
                    await db.set(`economy_user_${target.id}.job-d`, Date.now());
                    await db.set(`economy_user_${target.id}.job-7`, 0)
                    return message.channel.send({
                        embeds: [emb]
                    })
                }
                const emb = new Discord.MessageEmbed()
                    .setColor('FUCHSIA')
                    .setTitle(`Musician - ${message.author.username}`)
                    .setDescription(`You have written your song.\nThe concert is in \`${j} days\``)
                await db.set(`economy_user_${target.id}.job-d`, Date.now());
                return message.channel.send({
                    embeds: [emb]
                })
            }
        }
    },
};


/**
 * miner 1
 * policier 3
 * banquier 5
 * pecheur 2
 * fermier 0
 * scientifique 4
 * chanteur 6
 */