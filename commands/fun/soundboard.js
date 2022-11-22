const Discord = require("discord.js");
const { QuickDB } = require('quick.db')
const SoundBoard = require("djs-soundboard")
module.exports = {
   name: "soundboard",
   aliases: ["sb"],
   cooldowns: 3000,
   description: "A soundboard with full song",
   usage: "<song>",
   toggleOff: false,
   developersOnly: false,
   userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
   botpermissions: ["ADMINISTRATOR"],

   run: async (client, message, args) => {
    const db = new QuickDB({
        'table': `Guild_${message.guildId}`
    })
    const embed = new Discord.MessageEmbed()
        .setColor("WHITE")
        .setDescription(`
        Please specify a song\n
        See all song with \`${client.config.prefix}sb list\``)

    let list = [
        "arigato", "fuck you", "kamehameha", "katon", "kawaii", "niconiconii", "oni-chan", "pikapika", "senpai", "turuturu",

        "notif", "error", "fart", "okbye", "villager", "death", 

        "bruh", "chaipilo", "coffin dance", "enemy spotted", "helicopter helicopter", "lesgo", "nikal", "noice",
         "ok simp", "oh no", "rickroll", "suck a dick", "surprise motherfucker", 
         
        "female orgasm", "fuck me daddy", "huge boobs", "moan", "earrape", "orgasm real", "pussy", "turtlesex", "yamete"
    ]
    let anime = ["arigato", "fuck you", "kamehameha", "katon", "kawaii", "niconiconii", "oni-chan", "pikapika", "senpai", "turuturu"]
    let effect = ["notif", "error", "fart", "okbye", "villager", "death"]
    let memes = ["bruh", "chaipilo", "coffin dance", "enemy spotted", "helicopter helicopter", "lesgo", "nikal", "noice",
    "ok simp", "oh no", "rickroll", "suck a dick", "surprise motherfucker"]
    let nsfw = ["female orgasm", "fuck me daddy", "huge boobs", "moan", "earrape", "orgasm real", "pussy", "turtlesex", "yamete"]



    let sb = new SoundBoard()
    if(!args[0]) return message.reply({embeds: [embed]})
    if(args[0] == "list") {
        const embL = new Discord.MessageEmbed()
        .setColor('WHITE')
        .setTitle("Soundboard")
        .setDescription(`Total Song : \`${list.length}\`\n
        To play a song done: \`${client.config.prefix}sb <sound>\`\n
        **Anime :**
        ${anime.sort((a, b) => a - b).map((r) => `\`${r}\``).join(", ").toString()}

        **Effect :**
        ${effect.sort((a, b) => a - b).map((r) => `\`${r}\``).join(", ").toString()}

        **Memes :**
        ${memes.sort((a, b) => a - b).map((r) => `\`${r}\``).join(", ").toString()}

        **NSFW :**
        ${nsfw.sort((a, b) => a - b).map((r) => `\`${r}\``).join(", ").toString()}
        `)
        return message.channel.send({embeds: [embL]})
    }
    const sound = args.join(' ')
    if(!list.includes(sound)) return message.reply({embeds: [embed]})
    let channel = message.member.voice.channel // required*
    if(!channel) return message.reply("Go to the voice channel.")
    sb.play(channel, Repl(sound))
    await message.react('🥁')
    setTimeout(() => {
        try {
            message.delete()
        } catch (error) {}
    }, 2000);


    function Repl(text) {
        let Valid = "";
        Valid = text.replace("fuck you", "fuck-you")
        Valid = Valid.replace("pikapika", "pikapika-42387")
        Valid = Valid.replace("notif", "discord-notification")
        Valid = Valid.replace("death", "roblox-death")
        Valid = Valid.replace("helicopter helicopter", "helicopter-helicopter")
        Valid = Valid.replace("oh no", "oh-no-no-no-tik-tok-song-sound-effect")
        Valid = Valid.replace("surprise motherfucker", "surprise-motherfucker")

        Valid = Valid.replace("female orgasm", "female-orgasm")
        Valid = Valid.replace("fuck me daddy", "fuckmedaddy")
        Valid = Valid.replace("huge boobs", "huge-boobs")
        Valid = Valid.replace("earrape", "nsfwEarrape")
        Valid = Valid.replace("orgasm real", "orgasmreal")
        return Valid
    }
   },
};
