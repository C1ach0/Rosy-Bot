const Discord = require("discord.js");
module.exports = {
    name: "server-list",
    aliases: ["sl"],
    cooldowns: 3000,
    description: "View all server in list",
    usage: "",
    toggleOff: false,
    developersOnly: true,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botpermissions: ["ADMINISTRATOR"],
    /**
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {string[]} args 
     */
    run: async (client, message, args) => {
        if(message.author.id != "358629612584173568") return
        let i0 = 0;
        let i1 = 10;
        let page = 1;

        let description =
            `Total Servers - ${client.guilds.cache.size}\n\n` +
            client.guilds.cache
            .sort((a, b) => b.memberCount - a.memberCount)
            .map(r => r)
            .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id}`)
            .slice(0, 10)
            .join("\n\n");

        let embed = new Discord.MessageEmbed()
            .setAuthor(client.user.tag, client.user.displayAvatarURL({
                dynamic: true
            }))

            .setColor("#ffffff")
            .setFooter(`Page - ${page}/${Math.ceil(client.guilds.cache.size / 10)}`)
            .setDescription(description);

        let msg = await message.channel.send({
            embeds: [embed]
        });

        await msg.react("⬅");
        await msg.react("➡");
        await msg.react("❌");

        let collector = msg.createReactionCollector(
            (reaction, user) => user.id === message.author.id
        );

        collector.on("collect", async (reaction, user) => {
            if (reaction._emoji.name === "⬅") {
                // Updates variables
                i0 = i0 - 10;
                i1 = i1 - 10;
                page = page - 1;

                // if there is no guild to display, delete the message
                if (i0 + 1 < 0) {
                    console.log(i0)
                    return msg.delete();
                }
                if (!i0 || !i1) {
                    return msg.delete();
                }

                description =
                    `Total Servers - ${client.guilds.cache.size}\n\n` +
                    client.guilds.cache
                    .sort((a, b) => b.memberCount - a.memberCount)
                    .map(r => r)
                    .map(
                        (r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id}`)
                    .slice(i0, i1)
                    .join("\n\n");

                // Update the embed with new informations
                embed
                    .setFooter(
                        `Page - ${page}/${Math.round(client.guilds.cache.size / 10 + 1)}`
                    )
                    .setDescription(description);

                // Edit the message
                msg.edit(embed);
            }

            if (reaction._emoji.name === "➡") {
                // Updates variables
                i0 = i0 + 10;
                i1 = i1 + 10;
                page = page + 1;

                // if there is no guild to display, delete the message
                if (i1 > client.guilds.cache.size + 10) {
                    return msg.delete();
                }
                if (!i0 || !i1) {
                    return msg.delete();
                }

                description =
                    `Total Servers - ${client.guilds.cache.size}\n\n` +
                    client.guilds.cache
                    .sort((a, b) => b.memberCount - a.memberCount)
                    .map(r => r)
                    .map(
                        (r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id}`)
                    .slice(i0, i1)
                    .join("\n\n");

                // Update the embed with new informations
                embed
                    .setFooter(
                        `Page - ${page}/${Math.round(client.guilds.cache.size / 10 + 1)}`
                    )
                    .setDescription(description);

                // Edit the message
                msg.edit(embed);
            }

            if (reaction._emoji.name === "❌") {
                return msg.delete();
            }

            // Remove the reaction when the user react to the message
            await reaction.users.remove(message.author.id);
        });
    },
};