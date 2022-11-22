// const client = require("../../index");
// const {
    
// } = require('discord.js');
// const { QuickDB } = require('quick.db');

// client.on("voiceStateUpdate", async (oldState, newState) => {
//     let db = new QuickDB({
//         "table": "Coffee"
//     });
//     console.log("Old State : ", oldState.channel)
//     console.log("New State : ", newState.channel)
//     let chx = await db.get("tempoVoice");
//     let channel = oldState.guild.channels.cache.get(chx)
//     if(!channel) return
//     console.log(channel)
// });