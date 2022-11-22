const client = require("../../index");
const {
    QuickDB
} = require("quick.db");
const {
    MessageEmbed
} = require("discord.js");
const chalk = require("chalk");

client.on("messageCreate", async (message) => {
    try {
        const db = new QuickDB({
            'table': `Guild_${message.guildId}`
        })
        if (message.author.bot || !message.guild) return
        const LevelSystem = await db.get(`LevelSystem`)
        if (LevelSystem == null) return

        xp(message)

        function xp(message) {
            if (!message.guild) return;
            if (message.author.bot) return;
            const randomNumber = Math.floor(Math.random() * 10) + 1;
            db.add(`Level_xp_${message.author.id}`, randomNumber)
            var level = db.get(`Level_level_${message.author.id}`) || 1;
            var xp = db.get(`Level_xp_${message.author.id}`)
            var xpNeeded = level * 500;
            if (xpNeeded < xp) {
                var newLevel = db.add(`Level_level_${message.author.id}`, 1)
                db.subtract(`Level_xp_${message.author.id}`, xpNeeded)
                let embed = new MessageEmbed()
                    .setColor(message.author.hexAccentColor)
                    .setDescription(`
                <:bling:893212775604699147> Congrats ${message.author}.
                You are level ${newLevel}
                `)
                    .setThumbnail(message.author.displayAvatarURL({
                        dynamic: true
                    }))
                message.channel.send({
                    embeds: [embed]
                })
            }
        }
    } catch (error) {
        console.log(chalk.gray("—————————————————————————————————"));
        console.log(
            chalk.white("["),
            chalk.red.bold("AntiCrash"),
            chalk.white("]"),
            chalk.gray(" : "),
            chalk.white.bold("Event Levels")
        );
        console.log(chalk.gray("—————————————————————————————————"));
        console.log(error);
    }
})