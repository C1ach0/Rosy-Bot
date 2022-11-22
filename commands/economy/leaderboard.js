const Discord = require("discord.js");
const {
    QuickDB
} = require('quick.db')
module.exports = {
    name: "leaderboard",
    aliases: ["lb", "", ""],
    cooldowns: 3000,
    description: "Top 5 peoples with must money",
    usage: "",
    toggleOff: false,
    developersOnly: true,
    userpermissions: [],
    botpermissions: ["ADMINISTRATOR"],
    /**
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {string[]} args 
     */
    run: async (client, message, args) => {
        const db = new QuickDB({
            'table': `Guild_${message.guildId}`
        });
        
        




    },
};

/**
 * top 5 serv
 * .....
 * top 5 mondial
 */