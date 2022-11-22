/*const client = require("../../rosy");
const db = require("quick.db")
const {
    Permissions,
    MessageEmbed
} = require('discord.js')

client.on("messageReactionAdd", async (reaction, user) => {
    try {
        db.table(`Guild_${reaction.message.guildId}`, 'string[]')
        let message = reaction.message;
        if (!message) return;
        if (user.bot) return;
        const Lang = await db.get(`Language`)
        const NotPerm = client.lang["translations"]["MODERATION"]["BAN"]["Not-Perms"][Lang || "en"]
        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return message.channel.send(`${message.author}, Vous ne pouvez pas effectuer ceci ('error event resetlvl')`).then(msg => {
            setTimeout(() => {
                if (!msg.deletable) return
                msg.delete()
            }, 3000)
        })

        if (message.embeds.length === 1 && message.embeds[0].description === `Please validate for reset`) {
            if (reaction.emoji.name === "✔") {
                message.channel.bulkDelete(1).catch(err => console.log())
                let resetlvl = new MessageEmbed()
                    .setAuthor(`🗑️ | Level Reset`)
                    .setDescription(`All the levels of the limbs were deleted!`)
                    .setTimestamp()
                message.channel.send({
                    embeds: [resetlvl]
                })
                const lvl = db.all(``)
                db.delete(lvl)
                return
            }

            if (reaction.emoji.name === "❌") {
                message.channel.bulkDelete(1).catch(err => console.log())
                let resetlvlfail = new MessageEmbed()
                    .setAuthor(`🗑️ | Level Reset`)
                    .setDescription(`The reset failed`)
                    .setTimestamp()
                message.channel.send({
                    embeds: [resetlvlfail]
                })
                return
            }
        }
    } catch (error) {
        console.log(`Erreur Event \n> Level Reset-Lvl : \n\n> ${error}`)
    }
})*/