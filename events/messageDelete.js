const client = require("../index");
const { Message } = require('discord.js')

try {
  client.on("messageDelete", /**@param {Message} message */ async  (message) => {
    client.snipes.set(message.channel.id, {
      content: message.content,
      author: message.member.user.tag,
      member: message.member,
      image: message.attachments.first() ? message.attachments.first().proxyURL : null
    })
  })
} catch (error) {
  console.log(`error : Event MessageDelete\n-> \${error}`)
}
