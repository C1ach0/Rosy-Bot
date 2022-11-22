const Discord = require("discord.js");
const {
    QuickDB
} = require('quick.db')
module.exports = {
    name: "city",
    aliases: ["", "", ""],
    cooldowns: 3000,
    description: "Start your adventure in buziness world",
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
        if (await db.get("RPG_Fusion")) return message.reply("Fusion RPG & Economy Enable")
        let target = message.author
        let started = await db.get(`economy_user_${target.id}.started`)
        if(started) return message.reply(`You have already launched the game.`)
        await db.set(`economy_user_${target.id}.started`, true)
        await db.set(`economy_user_${target.id}.bank`, 5)
        await db.set(`economy_user_${target.id}.bag`, 0)
        await db.set(`economy_user_${target.id}.job`, "farmer")
        await db.set(`economy_user_${target.id}.job-7`, 0)
        await db.set(`economy_user_${target.id}.rob`, true)
        message.channel.send("Your account was created !")
    },
};