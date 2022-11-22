const {
    Message,
    Client,
    MessageEmbed,
    Permissions
} = require("discord.js");
const { QuickDB } = require('quick.db');

module.exports = {
    name: "ban",
    aliases: ['cls'],
    cooldowns: 3000,
    description: "Clear a messages",
    usage: "<1-99>",
    toggleOff: false,
    developersOnly: false,
    userpermissions: ["MANAGE_MESSAGE"],
    botpermissions: ["MANAGE_MESSAGE"],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const db = new QuickDB({ 'table': `Guild_${message.guildId}`}); 
        
        // Language
        const Lang = await db.get(`Language`)

        const NotPerm = client.lang["translations"]["MODERATION"]["CLEAR"]["Not-Perms"][Lang || "en"]
        const Number = client.lang["translations"]["MODERATION"]["CLEAR"]["Number"][Lang || "en"]
        const Delete = client.lang["translations"]["MODERATION"]["CLEAR"]["Delete"][Lang || "en"]
        const Succes = client.lang["translations"]["MODERATION"]["CLEAR"]["Succes"][Lang || "en"]

        // Commands

        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.reply(NotPerm)

        let number = args[0]
        if (!number) return message.reply(Number)
        if (number >= 100 || number <= 1) return message.reply(Number)

        try {
            await message.delete()
        } catch (err) {}

        message.channel.bulkDelete(number).catch(async err => {
            console.log(err)

        }).then(async msg => {

            try {
                await message.reply(`${message.author === undefined ? message.user : message.author} ${Delete} \`${msg.size}\` ${Succes}`)
                    .then(msg => setTimeout(() => {
                        msg.delete()
                    }, 5000))
            } catch (err) {
                await message.channel.send(`${message.author === undefined ? message.user : message.author} ${Delete} \`${msg.size}\` ${Succes}`)
                    .then(msg => setTimeout(() => {
                        msg.delete()
                    }, 5000))
            }
        })

    },
};