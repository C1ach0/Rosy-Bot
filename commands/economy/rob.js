const Discord = require("discord.js");
const {
    QuickDB
} = require('quick.db')
const ms = require('ms')
module.exports = {
    name: "rob",
    aliases: ["steal", "thief", "capture"],
    cooldowns: 3000,
    description: `Steal money from a member / The police can earn a bonus if he stops a thief.`,
    usage: "[user]",
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
        if (!args[0]) return message.reply("Please mention a member.")
        const rob = db.get(`economy_user_${target.id}.rob`)
        let cible = message.mentions.members.first().user
        let Cibled = await db.get(`economy_user_${cible.id}.started`)
        if (!Cibled) return message.reply(`${cible} haven't started playing yet.`)
        if (rob) {
            let lastDaily = await db.get(`economy_user_${target.id}.rob-d`);
            let cooldown = 43200000; // 12 hours in ms
            if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
                const timeLeftRep = ms(cooldown - (Date.now() - lastDaily))
                return message.reply(`Please wait \`${timeLeftRep}\` before you can thief again.`)
            } else {
                let bag = await db.get(`economy_user_${cible.id}.bag`) / 3
                let win = Math.round(Math.random() * bag) + 1;
                let random = Math.round(Math.random() * 2);
                if(random == 0 || random == 2) {
                    return message.reply(`You did not succeed in stolen money from ${cible}`)
                }
                await db.sub(`economy_user_${cible.id}.bag`, win)
                await db.add(`economy_user_${target.id}.bag`, win)
                await db.set(`economy_guild.UserRob`, target.id)
                await db.set(`economy_user_${target.id}.rob-d`, Date.now());
                return message.reply(`You managed to thief \`$${win}\` to ${cible}`)
            }
        } else {
            let rober = await db.get(`economy_guild.UserRob`)
            if(!rober || rober == null || rober != cible.id) {
                await db.sub(`economy_user_${target.id}.bank`, 30)
                return message.reply("There is no thief, you lose \`$30\` for false information.")
            }
            if(rober == cible.id) {
                await db.set(`economy_guild.UserRob`, null)
                await db.sub(`economy_user_${cible.id}.bank`, 150)
                await db.add(`economy_user_${target.id}.bank`, 100)
                return message.reply("You have found the thief, you win a \`$100\` bonus while he loses \`$150\`")
            }
        }

    },
};

// let bag = 635/3
// let random = Math.round(Math.random() * bag) + 1;
// let random1 = Math.round(Math.random() * 2);
// if(random1 == 0 || random1 == 2) {
//     console.log(null)
// }
// console.log(random)