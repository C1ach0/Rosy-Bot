const {
    Message,
    Client,
    MessageEmbed,
    Permissions
} = require("discord.js");
const {QuickDB} = require('quick.db')

module.exports = {
    name: "card",
    aliases: ['rank-themes', 'level-themes', "rank-card", "lvl-card", "level-card"],
    cooldowns: 3000,
    description: "Choose the themes for your rank card",
    usage: "<themes> // <name of picture>",
    toggleOff: false,
    developersOnly: false,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botpermissions: ["ADMINISTRATOR"],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const db = new QuickDB({
            'table': `User_${message.author.id}`,
        })
        const themes = args[0]

        // !test 0 1 2 3 .

        if (!args[0]) {
            let embed = new MessageEmbed()
                .setColor('PURPLE')
                .setTitle('Choose a picture for your rank card')
                .setDescription(`
                Choose a category to see the different images available.
                -> \`!card <categorie>\`

                \`color\`, \`color-wave\`, \`bw\`, \`love\`,
                 \`manga\`, \`adventure\`, \`skate\`, \`rap\`,
                 \`car\`

                -> \`!card default\` To put back the bottom
                `)
            return message.channel.send({
                embeds: [embed]
            })
        }

        if (themes == 'color') {
            let embed = new MessageEmbed()
                .setColor('PURPLE')
                .setDescription(`
            Chosen an image in the following or returns back if you do not like it.
            -> \`!card <image>\`

            I send you the image in MP!
            `)
            message.channel.send({
                embeds: [embed]
            })

            message.author.send(`Here are the different images of the 'Color' category`)
            message.author.send(`\n**Name :** \`Color1\` \n ${client.background.Color1}\n`)
            message.author.send(`\n**Name :** \`Color2\` \n ${client.background.Color2}\n`)
            message.author.send(`\n**Name :** \`Color3\` \n ${client.background.Color3}\n`)
            message.author.send(`\n**Name :** \`Color4\` \n ${client.background.Color4}\n`)
            return message.author.send(`Choose the image that places you most and packs \`!card <name>\` on the guild.\ Nnote although the image appears on your profile for all the server.`)
        }

        if (themes == 'color-wave') {
            let embed = new MessageEmbed()
                .setColor('PURPLE')
                .setDescription(`
            Chosen an image in the following or returns back if you do not like it.
            -> \`!card <image>\`

            I send you the image in MP!
            `)
            message.channel.send({
                embeds: [embed]
            })

            message.author.send(`Here are the different images of the 'Color-Wave' category`)
            message.author.send(`\n**Name :** \`Color-Wave1\` \n ${client.background.Color-Wave1}\n`)
            message.author.send(`\n**Name :** \`Color-Wave2\` \n ${client.background.Color-Wave2}\n`)
            message.author.send(`\n**Name :** \`Color-Wave3\` \n ${client.background.Color-Wave3}\n`)
            message.author.send(`\n**Name :** \`Color-Wave4\` \n ${client.background.Color-Wave4}\n`)
            message.author.send(`\n**Name :** \`Color-Wave5\` \n ${client.background.Color-Wave5}\n`)
            return message.author.send(`Choose the image that places you most and packs \`!card <name>\` on the guild.\ Nnote although the image appears on your profile for all the server.`)
        }

        if (themes == 'bw') {
            let embed = new MessageEmbed()
                .setColor('PURPLE')
                .setDescription(`
            Chosen an image in the following or returns back if you do not like it.
            -> \`!card <image>\`

            I send you the image in MP!
            `)
            message.channel.send({
                embeds: [embed]
            })

            message.author.send(`Here are the different images of the 'Black and White' category`)
            message.author.send(`\n**Name :** \`BW1\` \n ${client.background.BW1}\n`)
            message.author.send(`\n**Name :** \`BW2\` \n ${client.background.BW2}\n`)
            message.author.send(`\n**Name :** \`BW3\` \n ${client.background.BW3}\n`)
            message.author.send(`\n**Name :** \`BW4\` \n ${client.background.BW4}\n`)
            message.author.send(`\n**Name :** \`BW5\` \n ${client.background.BW5}\n`)
            message.author.send(`\n**Name :** \`BW6\` \n ${client.background.BW6}\n`)
            return message.author.send(`Choose the image that places you most and packs \`!card <name>\` on the guild.\ Nnote although the image appears on your profile for all the server.`)
        }

        if (themes == 'love') {
            let embed = new MessageEmbed()
                .setColor('PURPLE')
                .setDescription(`
            Chosen an image in the following or returns back if you do not like it.
            -> \`!card <image>\`

            I send you the image in MP!
            `)
            message.channel.send({
                embeds: [embed]
            })

            message.author.send(`Here are the different images of the 'Love' category`)
            message.author.send(`\n**Name :** \`Love1\` \n ${client.background.Love1}\n`)
            message.author.send(`\n**Name :** \`Love2\` \n ${client.background.Love2}\n`)
            message.author.send(`\n**Name :** \`Love3\` \n ${client.background.Love3}\n`)
            message.author.send(`\n**Name :** \`Love4\` \n ${client.background.Love4}\n`)
            return message.author.send(`Choose the image that places you most and packs \`!card <name>\` on the guild.\ Nnote although the image appears on your profile for all the server.`)
        }

        if (themes == 'manga') {
            let embed = new MessageEmbed()
                .setColor('PURPLE')
                .setDescription(`
            Chosen an image in the following or returns back if you do not like it.
            -> \`!card <image>\`

            I send you the image in MP!
            `)
            message.channel.send({
                embeds: [embed]
            })

            message.author.send(`Here are the different images of the 'Manga' category`)
            message.author.send(`\n**Name :** \`Manga1\` \n ${client.background.Manga1}\n`)
            message.author.send(`\n**Name :** \`Manga2\` \n ${client.background.Manga2}\n`)
            message.author.send(`\n**Name :** \`Manga3\` \n ${client.background.Manga3}\n`)
            message.author.send(`\n**Name :** \`Manga4\` \n ${client.background.Manga4}\n`)
            message.author.send(`\n**Name :** \`Manga5\` \n ${client.background.Manga5}\n`)
            message.author.send(`\n**Name :** \`Manga6\` \n ${client.background.Manga6}\n`)
            message.author.send(`\n**Name :** \`Manga7\` \n ${client.background.Manga7}\n`)
            return message.author.send(`Choose the image that places you most and packs \`!card <name>\` on the guild.\ Nnote although the image appears on your profile for all the server.`)
        }

        if (themes == 'adventure') {
            let embed = new MessageEmbed()
                .setColor('PURPLE')
                .setDescription(`
            Chosen an image in the following or returns back if you do not like it.
            -> \`!card <image>\`

            I send you the image in MP!
            `)
            message.channel.send({
                embeds: [embed]
            })

            message.author.send(`Here are the different images of the 'Adventure' category`)
            message.author.send(`\n**Name :** \`Adventure1\` \n ${client.background.Adventure1}\n`)
            message.author.send(`\n**Name :** \`Adventure2\` \n ${client.background.Adventure2}\n`)
            message.author.send(`\n**Name :** \`Adventure3\` \n ${client.background.Adventure3}\n`)
            message.author.send(`\n**Name :** \`Adventure4\` \n ${client.background.Adventure4}\n`)
            message.author.send(`\n**Name :** \`Adventure5\` \n ${client.background.Adventure5}\n`)
            return message.author.send(`Choose the image that places you most and packs \`!card <name>\` on the guild.\ Nnote although the image appears on your profile for all the server.`)
        }

        if (themes == 'skate') {
            let embed = new MessageEmbed()
                .setColor('PURPLE')
                .setDescription(`
            Chosen an image in the following or returns back if you do not like it.
            -> \`!card <image>\`

            I send you the image in MP!
            `)
            message.channel.send({
                embeds: [embed]
            })

            message.author.send(`Here are the different images of the 'Skate' category`)
            message.author.send(`\n**Name :** \`Skate1\` \n ${client.background.Skate1}\n`)
            message.author.send(`\n**Name :** \`Skate2\` \n ${client.background.Skate2}\n`)
            message.author.send(`\n**Name :** \`Skate3\` \n ${client.background.Skate3}\n`)
            return message.author.send(`Choose the image that places you most and packs \`!card <name>\` on the guild.\ Nnote although the image appears on your profile for all the server.`)
        }

        if (themes == 'rap') {
            let embed = new MessageEmbed()
                .setColor('PURPLE')
                .setDescription(`
            Chosen an image in the following or returns back if you do not like it.
            -> \`!card <image>\`

            I send you the image in MP!
            `)
            message.channel.send({
                embeds: [embed]
            })

            message.author.send(`Here are the different images of the 'Rap' category`)
            message.author.send(`\n**Name :** \`Rap1\` \n ${client.background.Rap1}\n`)
            message.author.send(`\n**Name :** \`Rap2\` \n ${client.background.Rap2}\n`)
            message.author.send(`\n**Name :** \`Rap3\` \n ${client.background.Rap3}\n`)
            return message.author.send(`Choose the image that places you most and packs \`!card <name>\` on the guild.\ Nnote although the image appears on your profile for all the server.`)
        }

        if (themes == 'car') {
            let embed = new MessageEmbed()
                .setColor('PURPLE')
                .setDescription(`
            Chosen an image in the following or returns back if you do not like it.
            -> \`!card <image>\`

            I send you the image in MP!
            `)
            message.channel.send({
                embeds: [embed]
            })

            message.author.send(`Here are the different images of the 'Car' category`)
            message.author.send(`\n**Name :** \`Car1\` \n ${client.background.Car1}\n`)
            message.author.send(`\n**Name :** \`Car2\` \n ${client.background.Car2}\n`)
            message.author.send(`\n**Name :** \`Car3\` \n ${client.background.Car3}\n`)
            message.author.send(`\n**Name :** \`Car4\` \n ${client.background.Car4}\n`)
            message.author.send(`\n**Name :** \`Car5\` \n ${client.background.Car5}\n`)
            return message.author.send(`Choose the image that places you most and packs \`!card <name>\` on the guild.\ Nnote although the image appears on your profile for all the server.`)
        }



        // set image in db --> const db = new QuickDB({table: `User_${message.author.id}`});
        // await db.set('RankCard', imageURL)

        //Default
        if(themes == 'default') {
            await db.delete('RankCard')
            message.channel.send(`${message.member.user}, I changed the bottom of your card.`)
        }

        //Color
        if(themes == 'Color1') {
            await db.set('RankCard', client.background.Color1)
            message.channel.send(`${message.member.user}, I changed the bottom of your card.`)
        }
        if(themes == 'Color2') {
            await db.set('RankCard', client.background.Color2)
            message.channel.send(`${message.member.user}, I changed the bottom of your card.`)
        }
        if(themes == 'Color3') {
            await db.set('RankCard', client.background.Color3)
            message.channel.send(`${message.member.user}, I changed the bottom of your card.`)
        }
        if(themes == 'Color4') {
            await db.set('RankCard', client.background.Color4)
            message.channel.send(`${message.member.user}, I changed the bottom of your card.`)
        }

        //Color-Wave
        if(themes == 'Color-Wave1') {
            await db.set('RankCard', client.background.Color-Wave1)
            message.channel.send(`${message.member.user}, I changed the bottom of your card.`)
        }
        if(themes == 'Color-Wave2') {
            await db.set('RankCard', client.background.Color-Wave2)
            message.channel.send(`${message.member.user}, I changed the bottom of your card.`)
        }
        if(themes == 'Color-Wave3') {
            await db.set('RankCard', client.background.Color-Wave3)
            message.channel.send(`${message.member.user}, I changed the bottom of your card.`)
        }
        if(themes == 'Color-Wave4') {
            await db.set('RankCard', client.background.Color-Wave4)
            message.channel.send(`${message.member.user}, I changed the bottom of your card.`)
        }
        if(themes == 'Color-Wave5') {
            await db.set('RankCard', client.background.Color-Wave5)
            message.channel.send(`${message.member.user}, I changed the bottom of your card.`)
        }

        //BW
        if(themes == 'BW1') {
            await db.set('RankCard', client.background.BW1)
            message.channel.send(`${message.member.user}, I changed the bottom of your card.`)
        }
        if(themes == 'BW2') {
            await db.set('RankCard', client.background.BW2)
            message.channel.send(`${message.member.user}, I changed the bottom of your card.`)
        }
        if(themes == 'BW3') {
            await db.set('RankCard', client.background.BW3)
            message.channel.send(`${message.member.user}, I changed the bottom of your card.`)
        }
        if(themes == 'BW4') {
            await db.set('RankCard', client.background.BW4)
            message.channel.send(`${message.member.user}, I changed the bottom of your card.`)
        }
        if(themes == 'BW5') {
            await db.set('RankCard', client.background.BW5)
            message.channel.send(`${message.member.user}, I changed the bottom of your card.`)
        }
        if(themes == 'BW6') {
            await db.set('RankCard', client.background.BW6)
            message.channel.send(`${message.member.user}, I changed the bottom of your card.`)
        }

        //Love
        if(themes == 'Love1') {
            await db.set('RankCard', client.background.Love1)
            message.channel.send(`${message.member.user}, I changed the bottom of your card.`)
        }
        if(themes == 'Love2') {
            await db.set('RankCard', client.background.Love2)
            message.channel.send(`${message.member.user}, I changed the bottom of your card.`)
        }
        if(themes == 'Love3') {
            await db.set('RankCard', client.background.Love3)
            message.channel.send(`${message.member.user}, I changed the bottom of your card.`)
        }
        if(themes == 'Love4') {
            await db.set('RankCard', client.background.Love4)
            message.channel.send(`${message.member.user}, I changed the bottom of your card.`)
        }

        //Manga
        if(themes == 'Manga1') {
            await db.set('RankCard', client.background.Manga1)
            message.channel.send(`${message.member.user}, I changed the bottom of your card.`)
        }
        if(themes == 'Manga2') {
            await db.set('RankCard', client.background.Manga2)
            message.channel.send(`${message.member.user}, I changed the bottom of your card.`)
        }
        if(themes == 'Manga3') {
            await db.set('RankCard', client.background.Manga3)
            message.channel.send(`${message.member.user}, I changed the bottom of your card.`)
        }
        if(themes == 'Manga4') {
            await db.set('RankCard', client.background.Manga4)
            message.channel.send(`${message.member.user}, I changed the bottom of your card.`)
        }
        if(themes == 'Manga5') {
            await db.set('RankCard', client.background.Manga5)
            message.channel.send(`${message.member.user}, I changed the bottom of your card.`)
        }
        if(themes == 'Manga6') {
            await db.set('RankCard', client.background.Manga6)
            message.channel.send(`${message.member.user}, I changed the bottom of your card.`)
        }
        if(themes == 'Manga7') {
            await db.set('RankCard', client.background.Manga7)
            message.channel.send(`${message.member.user}, I changed the bottom of your card.`)
        }

        //Adventure
        if(themes == 'Adventure1') {
            await db.set('RankCard', client.background.Adventure1)
            message.channel.send(`${message.member.user}, I changed the bottom of your card.`)
        }
        if(themes == 'Adventure2') {
            await db.set('RankCard', client.background.Adventure2)
            message.channel.send(`${message.member.user}, I changed the bottom of your card.`)
        }
        if(themes == 'Adventure3') {
            await db.set('RankCard', client.background.Adventure3)
            message.channel.send(`${message.member.user}, I changed the bottom of your card.`)
        }
        if(themes == 'Adventure4') {
            await db.set('RankCard', client.background.Adventure4)
            message.channel.send(`${message.member.user}, I changed the bottom of your card.`)
        }
        if(themes == 'Adventure5') {
            await db.set('RankCard', client.background.Adventure5)
            message.channel.send(`${message.member.user}, I changed the bottom of your card.`)
        }

        //Skate
        if(themes == 'Skate1') {
            await db.set('RankCard', client.background.Skate1)
            message.channel.send(`${message.member.user}, I changed the bottom of your card.`)
        }
        if(themes == 'Skate2') {
            await db.set('RankCard', client.background.Skate2)
            message.channel.send(`${message.member.user}, I changed the bottom of your card.`)
        }
        if(themes == 'Skate3') {
            await db.set('RankCard', client.background.Skate3)
            message.channel.send(`${message.member.user}, I changed the bottom of your card.`)
        }

        //Rap
        if(themes == 'Rap1') {
            await db.set('RankCard', client.background.Rap1)
            message.channel.send(`${message.member.user}, I changed the bottom of your card.`)
        }
        if(themes == 'Rap2') {
            await db.set('RankCard', client.background.Rap2)
            message.channel.send(`${message.member.user}, I changed the bottom of your card.`)
        }
        if(themes == 'Rap3') {
            await db.set('RankCard', client.background.Rap3)
            message.channel.send(`${message.member.user}, I changed the bottom of your card.`)
        }

        //Car
        if(themes == 'Car1') {
            await db.set('RankCard', client.background.Car1)
            message.channel.send(`${message.member.user}, I changed the bottom of your card.`)
        }
        if(themes == 'Car2') {
            await db.set('RankCard', client.background.Car2)
            message.channel.send(`${message.member.user}, I changed the bottom of your card.`)
        }
        if(themes == 'Car3') {
            await db.set('RankCard', client.background.Car3)
            message.channel.send(`${message.member.user}, I changed the bottom of your card.`)
        }
        if(themes == 'Car4') {
            await db.set('RankCard', client.background.Car4)
            message.channel.send(`${message.member.user}, I changed the bottom of your card.`)
        }
        if(themes == 'Car5') {
            await db.set('RankCard', client.background.Car5)
            message.channel.send(`${message.member.user}, I changed the bottom of your card.`)
        }
    },
};