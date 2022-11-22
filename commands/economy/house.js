const Discord = require("discord.js");
const {
    QuickDB
} = require('quick.db')
module.exports = {
    name: "house",
    aliases: ["", "", ""],
    cooldowns: 3000,
    description: "Show your profile",
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
        let target = "";
        if(args[0]) {target = message.mentions.users.first();}
        else target = message.author
        let started = await db.get(`economy_user_${target.id}.started`)
        if (!started) return message.reply(`${target} has not yet started playing.`)

        let job = await db.get(`economy_user_${target.id}.job`)
        let bank = await db.get(`economy_user_${target.id}.bank`)
        let bag = await db.get(`economy_user_${target.id}.bag`)
        let success = await db.get(`economy_user_${target.id}.success`)

        const embed = new Discord.MessageEmbed()
        .setColor('WHITE')
        .setTitle(`House - ${target.username}`)
        .setDescription(`
        ✪ | **Success : \`${success != null ? success : "none"}\`
        ✪ | **Job :** \`${capitalizeFirstLetter(job)}\`
        ✪ | **All money:** \`$${bank + bag}\`
        `)
        message.channel.send({embeds: [embed]})

    },
};
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
