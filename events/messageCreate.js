const client = require("../index");
const {
   QuickDB
} = require('quick.db')
const {
   MessageEmbed
} = require("discord.js");
const chalk = require("chalk");
const ms = require("ms");
const {
   developerID
} = require("../botconfig/main.json");
const {
   clientavatar
} = require("../botconfig/main.json");
const {
   clientname
} = require("../botconfig/main.json");
const {
   randomMessages_Cooldown
} = require("../botconfig/main.json");
client.on("messageCreate", async (message) => {

   if (message.author.bot ||
      !message.guild)
      return;

   let db = new QuickDB({
      'table': `Guild_${message.guildId}`
   })
   const prefix = await db.get("Prefix") || client.config.prefix;
   if (!message.content.toLowerCase().startsWith(prefix))
      return;

   if (!message.member)
      message.member = await message.guild.fetchMember(message);
   const [cmd, ...args] = message.content
      .slice(prefix.length)
      .trim()
      .split(" ");
   let noargs_embed = new MessageEmbed()
      .setTitle(`:x: | Please Provide A Command To Be Executed!`)
      .setColor("RED")
      .setFooter(`${clientname}`, `${clientavatar}`)
      .setTimestamp();
   if (cmd.length === 0) return message.reply({
      embeds: [noargs_embed]
   });

   const command =
      client.commands.get(cmd.toLowerCase()) ||
      client.commands.find((c) => c.aliases?.includes(cmd.toLowerCase()));
   let nocmd_embed = new MessageEmbed()
      .setTitle(`:x: | No Command Found! Try Using  \`${prefix}help\``)
      .setColor("RED")
      .setFooter(`${clientname}`, `${clientavatar}`)
      .setTimestamp();
   if (!command) return message.channel.send({
      embeds: [nocmd_embed]
   });
   if (command.toggleOff) {
      let toggleoff_embed = new MessageEmbed()
         .setTitle(
            `:x: | That Command Has Been Disabled By The Developers! Please Try Later.`
         )
         .setColor("RED")
         .setFooter(`${clientname}`, `${clientavatar}`)
         .setTimestamp();
      return message.reply({
         embeds: [toggleoff_embed]
      });
   } else if (!message.member.permissions.has(command.userpermissions || [])) {
      let userperms_embed = new MessageEmbed()
         .setTitle(`:x: | You Don't Have Permissions To Use The Command!`)
         .setColor("RED")
         .setFooter(`${clientname}`, `${clientavatar}`)
         .setTimestamp();
      return message.reply({
         embeds: [userperms_embed]
      });
   } else if (!message.guild.me.permissions.has(command.botpermissions || [])) {
      let botperms_embed = new MessageEmbed()
         .setTitle(`:x: | I Don't Have Permissions To Use The Command!`)
         .setColor("RED")
         .setFooter(`${clientname}`, `${clientavatar}`)
         .setTimestamp();
      return message.reply({
         embeds: [botperms_embed]
      });
   } else if (command.developersOnly) {
      if (!developerID.includes(message.author.id)) {
         let developersOnly_embed = new MessageEmbed()
            .setTitle(`:x: | Only Developers Can Use That Command!`)
            .setDescription(
               `Developers: ${developerID.map((v) => `<@${v}>`).join(",")}`
            )
            .setColor("RED")
            .setFooter(`${clientname}`, `${clientavatar}`)
            .setTimestamp();
         return message.reply({
            embeds: [developersOnly_embed]
         });
      }
   } else if (command.cooldowns) {
      if (client.cooldowns.has(`${command.name}${message.author.id}`)) {
         let cooldown_embed = new MessageEmbed()
            .setTitle(
               `${
                  randomMessages_Cooldown[
                     Math.floor(Math.random() * randomMessages_Cooldown.length)
                  ]
               }`
            )
            .setDescription(
               `You Need To Wait \`${ms(
                  client.cooldowns.get(`${command.name}${message.author.id}`) -
                     Date.now(),
                  { long: true }
               )}\` To Use \`${prefix}${command.name}\` again!`
            )
            .setColor("BLUE")
            .setFooter(`${clientname}`, `${clientavatar}`)
            .setTimestamp();

         return message.reply({
            embeds: [cooldown_embed]
         });
      }

      client.cooldowns.set(
         `${command.name}${message.author.id}`,
         Date.now() + command.cooldowns
      );

      setTimeout(() => {
         client.cooldowns.delete(`${command.name}${message.author.id}`);
      }, command.cooldowns);
   }
   await command.run(client, message, args);
   const dbuse = new QuickDB({
      'table': "Others"
   })
   await dbuse.add('NB_Utilisation', 1)
});

client.on("messageCreate", async (message) => {
   if (message.mentions.has(client.user)) {
      if (message.mentions.everyone) return;
      if (message.author.bot ||
         !message.guild)
         return;
      if(message.content.length > 23) return
      let db = new QuickDB({
         'table': `Guild_${message.guildId}`
      })
      const prefix = await db.get("Prefix") || client.config.prefix;
      console.log(message.content.length)
      let emb = new MessageEmbed()
      .setColor('WHITE')
      .setTitle(`Prefix - ${client.user.username}`)
      .setDescription(`My prefix is : \`${prefix}\``)
      return message.reply({embeds: [emb]})

   }
})