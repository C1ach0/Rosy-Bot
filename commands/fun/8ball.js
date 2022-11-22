const { Message, Client, MessageEmbed } = require("discord.js");
const { QuickDB } = require('quick.db')

module.exports = {
    name: "8ball",
    description: "Ask a question",
    usage: '<question>',
   cooldowns: 3000,
   toggleOff: false,
   developersOnly: false,
   userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
   botpermissions: ["SEND_MESSAGES", "MANAGE_WEBHOOKS"],

    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const db = new QuickDB({ 'table': `Guild_${message.guildId}`});
        const Lang = db.get(`Language`)
        if(Lang == 'en' || null) {
            const answers = [
            "It is certain.",
             "It is definitely so.",
             "Without a doubt.",
             "Yes definitely.",
             "You can trust it.",
             "As I see it yes.",
             "Good perspective.",
             "Yes.",
             "No.",
             "The signs point to Yes.",
             "I do not know.",
             "Reply foggy, try again.",
             "Ask again later.",
             "Better not to tell you now.",
             "Can't predict now.",
             "Concentrate and ask again.",
             "Don't count on it.",
             "My answer is no.",
             "My sources say no.",
             "The outlook is not so good.",
             "Very doubtful." 
            ];
            const question = args.join(' ');
            if (!question) return message.reply('Please provide a question to ask');
            const embed = new MessageEmbed()
                .setTitle('🎱  I answer your questions  🎱')
                .addField('Question', question)
                .addField('Answer', `${answers[Math.floor(Math.random() * answers.length)]}`)
                .setTimestamp()
                .setColor("#2f3136");
            message.channel.send({embeds: [embed]})
        }
        if(Lang == 'fr') {
            const answers = [
                "Il est certain.",
                 "C'est définitivement.",
                 "Sans aucun doute.",
                 "Oui définitivement.",
                 "Vous pouvez la faire confiance.",
                 "Comme je le vois oui.",
                 "Bonne perspective.",
                 "Oui.",
                 "Non.",
                 "Les signes indiquent oui.",
                 "Je ne sais pas.",
                 "Répondre brouillard, essayez à nouveau.",
                 "Demander à nouveau plus tard.",
                 "Mieux vaut ne pas vous dire maintenant.",
                 "Concentrez-vous et demandez à nouveau.",
                 "Ne comptez pas dessus.",
                 "Ma réponse est non.",
                 "Mes sources disent non.",
                 "Les perspectives n'est pas si bonne.",
                 "Très douteux." 
                ];
                const question = args.join(' ');
                if (!question) return message.reply('S\'il vous plaît fournir une question à demander');
                const embed = new MessageEmbed()
                    .setTitle('🎱  Je réponds à vos questions  🎱')
                    .addField('Question', question)
                    .addField('Réponse', `${answers[Math.floor(Math.random() * answers.length)]}`)
                    .setTimestamp()
                    .setColor("#2f3136");
                message.channel.send({embeds: [embed]})
        }


        
        
    },
};