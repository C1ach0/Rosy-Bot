const { MessageEmbed, Message, MessageAttachment } = require('discord.js')
const client = require("../../index");
const { QuickDB } = require('quick.db');;

client.on('guildMemberAdd', async member => {
    db.table(`Guild_${member.guild.id}`, 'string[]')

    // channel
    let Welchx = db.get(`WelcomeChannel`);
    if(Welchx === null) return;
    
    const channel = member.guild.channels.cache.get(Welchx)
    if(!channel) return

    // contant for embed

    const embedColor = db.get(`WelcomeEmbedColor`)

    const embedTitle = db.get(`WelcomeEmbedTitle`)

    const embedDescription = db.get(`WelcomeEmbedDescription`)

    const embedImg = db.get(`WelcomeEmbedImg`)
    
    const embedFooter = db.get(`WelcomeEmbedFooter`)

    // Lang selection

    const Lang = await db.get(`Language`)
    if(Lang === "en" ||  null) {
        let Welcome = new MessageEmbed()
        .setColor(embedColor || member.guild.me.displayHexColor)
        .setTitle(embedTitle || ``)
        .setAuthor(`Welcome ${member.user.username}`)
        .setDescription(embedDescription || ``)
        .setImage(embedImg || client.config.defaultWelcomeImage)
        .setFooter(embedFooter || `MemberCount : ${member.guild.memberCount}`)
        await member.guild.channels.cache.get(Welchx).send({embeds: [Welcome]})
    }

    if(Lang == 'fr') {
        let Welcome = new MessageEmbed()
        .setColor(embedColor || member.guild.me.displayHexColor)
        .setTitle(embedTitle || ``)
        .setAuthor(`Bienvenue ${member.user.username}`, member.user.displayAvatarURL({dynamic: true}))
        .setDescription(embedDescription || ``)
        .setImage(embedImg || client.config.defaultWelcomeImage)
        .setFooter(embedFooter || `Membres : ${member.guild.memberCount}`)
        await member.guild.channels.cache.get(Welchx).send({embeds: [Welcome]})
    }

})

client.on('guildMemberAdd', async member => {
    db.table(`Guild_${member.guild.id}`, 'string[]')
    const nick = db.get(`Prefix_Nickname`)
    member.setNickname(`${nick}${member.user.username}`, `Automatic prefix-nickname.`)
})
