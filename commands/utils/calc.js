const Discord = require("discord.js");
const math = require('mathjs');
module.exports = {
    name: "calc",
    aliases: ["", "", ""],
    cooldowns: 3000,
    description: "Calculate an operation",
    usage: "<operation>",
    toggleOff: false,
    developersOnly: false,
    userpermissions: [],
    botpermissions: [],
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {string[]} args 
     */
    run: async (client, message, args) => {
        let ope = args.join(" ");
        let embErr = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle("Error for calculation")
        .setAuthor(message.author.username, message.member.user.displayAvatarURL({dynamic: true}))
        .setDescription(`I cannot solve the following operation: \`${ope}\``)
        .setTimestamp()
        try {
            let eval = math.evaluate(ope)
            let embVal = new Discord.MessageEmbed()
            .setColor("WHITE")
            .setAuthor(message.author.username, message.member.user.displayAvatarURL({dynamic: true}))
            .setDescription(`**Operation :** \n\`${ope}\`
            \n__Result :__ \n\`${eval}\``)
            .setTimestamp()
            return message.channel.send({embeds: [embVal]})
        } catch (error) {
            return message.reply({embeds: [embErr]})
        }
    },
};