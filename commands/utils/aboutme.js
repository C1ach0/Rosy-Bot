const { MessageEmbed, Client, Message } = require("discord.js");
const { QuickDB } = require('quick.db')
module.exports = {
   name: "aboutme",
   aliases: ["aboutowner"],
   cooldowns: 3000,
   description: "About the Creator of the Bot",
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
    const mdp = "8200SAOB38"
        const db = new QuickDB({
            "table": "Others"
        })
        const QuestLuanched = await db.get(`QuestLuanchedAboutMe_${message.guild.id}`)
        const QuestFinished = await db.get(`QuestFinishedAboutMe_${message.guild.id}`)


        if (args[0] == 'pass') {
            if(QuestLuanched == null) return 
            if(QuestFinished == true) return

            if (args[1] == mdp) {
                message.channel.send('Je vais essayer ce mot de passe...')
                setTimeout(() => {
                    message.channel.send(`J'ai réussi à accéder au fichier! Je vais modifié ce qu'il ne va pas.\nVoila tu peut maintenant refaire la commande \`${client.config.prefix}aboutme\` pour voir le contenu original.`)
                }, 3000);
                await db.set(`QuestFinishedAboutMe_${message.guild.id}`, true)
                return
            }
            message.channel.send('Je vais essayer ce mot de passe...')
            setTimeout(() => {
                message.channel.send("Argghh..! Le mot de passe n'est pas correct.. Trouve en un nouveau pour résoudre le souci.")
            }, 3000);
            return
        }
        if (args[0] == 'quest') {
            if(QuestLuanched == null) return
            if(QuestFinished == true) return

            let embed = new MessageEmbed()
            .setColor('DARK_ORANGE')
            .setTitle('__About Me Quest__')
            .setDescription(`
            Je suis une assistance qui va t'aider à résoudre la quête.
            J'ai fouillé le code et.. il n'est pas très propre donc j'ai réussi à avoir quelque informations.

            Le mot de passe fait uniquement \`10 Caractères\`, je n'ai pas vu de caractères spéciaux.
            Les \`4\` premiers caractères sont des chiffres et je pense que sa viens de mon créateur.
            Les \`2\` derniers caractères sont des chiffres aussi, le **dernier** chiffre vient d'un identifiant.
            Pour les lettres, il faudrait chercher dans ces **hobbies**, et ce qu'il **adore**.

            Voila, c'est tout ce que je sais. Maintenant je te laisse chercher.
            `)
            .setFooter(`${client.users.cache.get(client.config.OwnerId).tag}, ID: ${client.users.cache.get(client.config.OwnerId).id}`)
            message.channel.send({
                embeds: [embed]
            })
            return
        }

        if (QuestFinished == true) {

            let embed = new MessageEmbed()
                .setColor('DARK_ORANGE')
                .setTitle('__About Me__')
                .setDescription(`
            Bonjour lors de la création du bot,
            \nJ'ai commencé la construcion du bot en milieu d'année de mes 17 ans.
            Je suis fan de jeux-vidéos, manga/animé et de développement. Actuellement je passe plus de temps à coder plutôt que devant un jeu.
            Mon animé préférer est "Sword Art Online". Youtubeur préférer, "FuzeIII". J'adore les Bisounours !! 
            Si je suis sur le serveur, j'aimerais trop avoir un rôle Bisounours je suis trop bg apres. 😎
            J'espère que mon bot vous plaie. En tout cas Merci de l'avoir mis sur le serv.
            `)
                .setFooter(`${client.users.cache.get(client.config.OwnerId).tag}, ID: ${client.users.cache.get(client.config.OwnerId).id}`)
            message.channel.send({
                embeds: [embed]
            })
            return
        }

        if (QuestFinished == null) {
            let embed = new MessageEmbed()
                .setColor('DARK_ORANGE')
                .setTitle('__About Me__')
                .setDescription(`
            Bonjour lors de la création du bot,
            \n J'ai commencé la construcion du bot en milieu d'année de mes \`$*#\` ans.
            Je suis fan de jeux-vidéos, \`$*=~~#\` et de développement. Actuellement je passe plus \`$*=x&~£~#\`.
            Mon animé préférer est "Sword Art Online". Youtubeur préférer : "FuzeIII". J'adore les Bisounours !! 
            Si je suis sur le serveur, j'aimerais trop avoir un rôle \`B$*~&3#\` je suis trop bg apres. 😎
            J'espère que mon bot vous plaie. En tout cas Merci de l'avoir mis sur le serv.
            `)
                .setFooter(`${client.users.cache.get(client.config.OwnerId).tag}, ID: ${client.users.cache.get(client.config.OwnerId).id}`)
            message.channel.send({
                embeds: [embed]
            })

            let QuestEmbed = new MessageEmbed()
                .setColor('DARK_ORANGE')
                .setDescription(`
            - Ohh mais il y à des bugs dans le message.. Que dirait-tu de régler sa avec moi ?
            **La quête "Corrigé les bugs" est sur le point de ce lancé!**
            
            - Tu peut faire \`${client.config.prefix}aboutme quest\` pour voir la quête ainsi que des indices.
            - Argghh, un mot de passe me bloque l'accès.. Il faudrait le trouver afin que je puisse entré dans le code pour régler le problème.

            Pourrait-tu trouver le mot de passe ?

            - Lorsque tu as trouver le mot de passe, fait \`${client.config.prefix}aboutme pass <password>\` pour me le donné!
            `)
            message.channel.send({
                embeds: [QuestEmbed]
            })
            await db.set(`QuestLuanchedAboutMe_${message.guild.id}`, true)
            return
        }
   },
};
