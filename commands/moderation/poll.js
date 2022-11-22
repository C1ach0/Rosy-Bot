const Discord = require("discord.js");
const ms = require('ms')
module.exports = {
    name: "poll",
    cooldowns: 3000,
    description: "Ask your members with a question",
    usage: "<duration> <question>",
    toggleOff: false,
    developersOnly: false,
    userpermissions: ["MANAGE_MESSAGES"],
    botpermissions: ["ADMINISTRATOR"],
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {string[]} args 
     */
    run: async (client, message, args) => {
        try {
            if(args[0].endsWith("s" || "m" ||"h" ||"d")) return message.reply("Please specify a duration.")
            const text = args.slice(1).join(' ')
            const embed = new Discord.MessageEmbed()
                .setColor('WHITE')
                .setTitle(`Poll - ${message.guild.name}`)
                .setDescription(`__Question :__\n✪ | ${text}`)
                .setFooter(`Duration : ${msToTime(ms(args[0]))}`)
                .setTimestamp()
            let msg = await message.channel.send({
                embeds: [embed]
            })
            await msg.react('✅')
            await msg.react('❌')
            message.delete().catch(err => console.log())

            setTimeout(() => {
                let ok = msg.reactions.cache.get('✅').count - 1;
                let no = msg.reactions.cache.get('❌').count - 1;
                if (ok > no) {
                    const embOk = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle(`Poll - ${message.guild.name}`)
                    .setDescription(`The majority of people validated the question: \n✪ | \`${text}\``)
                    msg.edit({embeds: [embOk]})
                } else if (ok == no) {
                    const embBof = new Discord.MessageEmbed()
                    .setColor('WHITE')
                    .setTitle(`Poll - ${message.guild.name}`)
                    .setDescription(`There are as much possible as a negative way for this question: \n✪ | \`${text}\``)
                    msg.edit({embeds: [embBof]})
                } else if (ok < no) {
                    const embNo = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setTitle(`Poll - ${message.guild.name}`)
                    .setDescription(`The majority of people are against this question: \n✪ | \`${text}\``)
                    msg.edit({embeds: [embNo]})
                }
                msg.reactions.removeAll()
            }, ms(args[0]));
        } catch (end) {}


    },
};

function msToTime(ms) {
    let seconds = (ms / 1000).toFixed(0);
    let minutes = (ms / (1000 * 60)).toFixed(0);
    let hours = (ms / (1000 * 60 * 60)).toFixed(0);
    let days = (ms / (1000 * 60 * 60 * 24)).toFixed(0);
    if (seconds < 60) return seconds + " secondes";
    else if (minutes < 60) return minutes + " minutes";
    else if (hours < 24) return hours + " heures";
    else return days + " jours"
}