const {
    Message,
    Client,
    MessageEmbed,
    Permissions
} = require("discord.js");
const moment = require('moment')

const filterLevels = {
    DISABLED: 'Off',
    MEMBERS_WITHOUT_ROLES: 'No Role',
    ALL_MEMBERS: 'Everyone'
};
const verificationLevels = {
    NONE: 'None',
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High',
    VERY_HIGH: 'Very High'
};

module.exports = {
    name: "guildinfo",
    aliases: ["gi"],
    cooldowns: 3000,
    description: "See the information of the guild",
    usage: "",
    toggleOff: false,
    developersOnly: false,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botpermissions: ["MANAGE_GUILD"],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        try {
            const guildId = message.guildId
            const roles = client.guilds.cache.get(guildId).roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
            // const members = Number;
            // message.guild.members.fetch({force:false, cache: false}).then(m => {m.filter(i=> !i.user.bot).size; return members = m.filter(i=> !i.user.bot).size} )
            // const bot = Number;
            // message.guild.members.fetch({force:false, cache: false}).then(m => {m.filter(i=> i.user.bot).size; return members = m.filter(i=> i.user.bot).size})
            let memb = []
            message.guild.members.fetch().then(members => {
                // Loop through every members
                members.forEach(member => {
                    memb.push(member)
                });
            });
            const channels = client.guilds.cache.get(guildId).channels.cache;
            const emojis = client.guilds.cache.get(guildId).emojis.cache;

            const embed = new MessageEmbed()
                .setDescription(``)
                .setColor('BLUE')
                .setThumbnail(client.guilds.cache.get(guildId).iconURL({
                    dynamic: true
                }))
                .setTitle(`Information about the guild **${message.guild.name}**`)
                .setDescription(`
                __**General**__
                **Guild name :** \`${message.guild.name}\`
                **Owner :** \`${message.guild.members.cache.get(message.guild.ownerId).user.tag || "err"}\`
                **Owner Id :** \`${message.guild.ownerId}\`
                **Region :** \`${message.guild.preferredLocale}\`
                **Boost :** \`${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}\`
                **Explicit filter :** \`${filterLevels[message.guild.explicitContentFilter]}\`
                **Verification level :** \`${verificationLevels[message.guild.verificationLevel]}\`
                **Created the :** \`${moment(message.guild.createdTimestamp).format('DD/MM/YYYY, hh:mm')}\`
                \n
                __**Number of members**__
                **Number of members :** \`${message.guild.memberCount}\`
                **Humans :** \`${memb.length}\`
                **Bots :** \`${bot.length}\`
                \n
                __**Server**__
                **Roles :** \`${roles.length}\`
                **Channels :** \`${channels.size}\`
                **Emojis :** \`${emojis.size}\`
                ${emojis.size <= 20 ? emojis.sort((a, b) => b - a).map(a => a.toString()).join(', ') || '' : ""}
                `)
                .setFooter(client.user.username, client.user.displayAvatarURL({
                    dynamic: true
                }))
                .setTimestamp()
            message.channel.send({
                embeds: [embed]
            })
        } catch (error) {
            console.log(error)
        }

    },
};

//**Humans :** \`${members}\`
//**Bots :** \`${bot}\`
//${message.client.users.cache.get(message.guild.ownerId).tag}