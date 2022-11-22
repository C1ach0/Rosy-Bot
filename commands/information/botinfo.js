const {
    Message,
    Client,
    MessageEmbed,
    Permissions,
    version: discordjsVersion
} = require("discord.js");
const moment = require('moment');
const {
    mem,
    cpu,
    os
} = require('node-os-utils');

module.exports = {
    name: "botinfo",
    cooldowns: 3000,
    description: "See the information of the bot",
    usage: "",
    toggleOff: false,
    developersOnly: false,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botpermissions: [""],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        // Constant with Moment
        const d = moment.duration(message.client.uptime);
        const days = (d.days() == 1) ? `${d.days()} day` : `${d.days()} days`;
        const hours = (d.hours() == 1) ? `${d.hours()} hour` : `${d.hours()} hours`;

        const { totalMemMb, usedMemMb } = await mem.info();
        //const members = client.users.fetch({force:false, cache: false}).then(m => m.filter(i=> !i.user.bot).size )
        //const bot = client.users.fetch({force:false, cache: false}).then(m => m.filter(i=> i.user.bot).size )
        let embed2 = new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setTitle('Bot Information')
            .setThumbnail(message.client.user.displayAvatarURL())
            .setDescription(`
            **__Informations__**
            **Bot Name :** \`${message.client.user.username}\`
            **Owner :** \`${message.client.users.cache.get(client.config.OwnerId).tag}\`
            [GitHub](https://github.com/clachoverclan) | [Bot Invite](${client.config.clientInviteUrl}) | [Support](${client.config.supportInviteUrl})

            **Prefix :** \`${client.config.prefix}\`
            **Total Commands :** \`${message.client.commands.size}\`

            **Created the :** \`${moment(message.client.user.createdTimestamp).format('DD/MM/YYYY, hh:mm')}\`
            **Build Finished the :** \`${client.config.DevFinish}\`
            \n
            **__Client__**
            **Guilds :** \`${client.guilds.cache.size}\`
            **Members :** \`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} ${
                client.guilds.cache.reduce((a, b) => a + b.memberCount, 0) > 1
                  ? "Users"
                  : "User"
              }\`
            **WS Ping :** \`${Math.round(client.ws.ping)} ms\`
            **Uptime :** \`${days} and ${hours}\`
            \n
            **__Server__**
            **OS :** \`${process.platform} ${process.arch}\`
            **Cores :** \`${cpu.count()}\`
            **CPU Usage :** \`${await cpu.usage()} %\`
            **RAM :** \`${totalMemMb} MB\`
            **RAM Usage :** \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\`
            **Version Node :** \`${process.version}\`
            **Version DiscordJS :** \`${discordjsVersion}\`
            `)
            .setFooter(`Build by : ${message.client.users.cache.get(client.config.OwnerId).tag}`, message.client.users.cache.get(client.config.OwnerId).displayAvatarURL())
        message.channel.send({
            embeds: [embed2]
        })
    },
};

//**Members :** \`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0) > 1 ? "Users,": "User,"}\`
