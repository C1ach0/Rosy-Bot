const {
   MessageEmbed,
   MessageActionRow,
   MessageSelectMenu,
} = require("discord.js");
const helpemoji = require("../../botconfig/help.json");
const {
   clientname,
   clientavatar,
   prefix,
   clientInviteUrl,
   supportInviteUrl
} = require("../../botconfig/main.json");
const {
   helpImg,
} = require("../../botconfig/background.json")
const {
   readdirSync
} = require("fs");
const ms = require("ms");
let color = "#2F3136";

module.exports = {
   name: "help",
   aliases: ["h"],
   cooldowns: 3000,
   description: "Help Command",
   usage: "",
   toggleOff: false,
   developersOnly: false,
   userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
   botpermissions: ["ADMINISTRATOR"],
   run: async (client, message, args) => {
      try {


         if (!args[0]) {
            const roleColor =
               message.guild.me.displayHexColor === "#000000" ?
               "#ffffff" :
               message.guild.me.displayHexColor;

            const directories = [
               ...new Set(client.commands.map((cmd) => cmd.directory)),
            ];

            const formatString = (str) => {
               return `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
            };

            const categories = directories.map((dir) => {
               const getCommands = client.commands
                  .filter((cmd) => cmd.directory === dir)
                  .map((cmd) => {
                     return {
                        name: cmd.name ? cmd.name : "No command name!",
                        description: cmd.description ?
                           cmd.description : "No command description!",
                     };
                  });

               return {
                  directory: formatString(dir),
                  commands: getCommands,
               };
            });

            const embed = new MessageEmbed()
               .setTitle(`${clientname || "Bot"}'s Commands`)
               .setDescription(
                  `**Total Commands :** \`${client.commands.size}\`\n\n\`\`\`\nPrefix: ${prefix}\nParameters: <> = required, [] = optional\`\`\`\n[Invite me](${clientInviteUrl}) | [Support](${supportInviteUrl})\n`
               )
               .setColor(roleColor)
               .setImage(helpImg)
               .setFooter(`${clientname}`, `${clientavatar}`)
               .setTimestamp();

            const components = (state) => [
               new MessageActionRow().addComponents(
                  new MessageSelectMenu()
                  .setCustomId("help-menu")
                  .setPlaceholder("Please select a category!")
                  .setDisabled(state)
                  .addOptions([
                     categories.map((cmd) => {
                        return {
                           label: `${cmd.directory}`,
                           value: `${cmd.directory.toLowerCase()}`,
                           emoji: `${helpemoji[cmd.directory.toLowerCase()]}`,
                           description: `Commands from ` + `${cmd.directory}` + " category",
                        };
                     }),
                  ])
               ),
            ];

            const inMessage = await message.channel.send({
               embeds: [embed],
               components: components(false),
            });

            const filter = (interaction) => interaction.user.id === message.author.id;

            const collector = message.channel.createMessageComponentCollector({
               filter,
               componentType: "SELECT_MENU",
               time: 60000,
            });

            collector.on("collect", (interaction) => {
               const [directory] = interaction.values;
               const category = categories.find(
                  (x) => x.directory.toLowerCase() === directory
               );

               const embed2 = new MessageEmbed()
                  .setTitle(`${directory.charAt(0).toUpperCase()}${directory.slice(1).toLowerCase()}`)
                  .setDescription(
                     "" + category.commands.map((cmd) => `✪ | \`${cmd.name}\` (*${cmd.description}*)`).join("\n ")
                  )
                  .setColor(roleColor);

               interaction.update({
                  embeds: [embed2]
               });
            });

            collector.on("end", () => {
               inMessage.edit({
                  components: components(true)
               });
            });
            return
         }
         let cots = [];
         let catts = [];

         readdirSync("./commands/").forEach((dir) => {
            if (dir.toLowerCase() !== args[0].toLowerCase()) return;

            const commands = readdirSync(`./commands/${dir}`).filter((file) =>
               file.endsWith(".js")
            );

            const cmds = commands.map((command) => {
               let file = require(`../../commands/${dir}/${command}`);

               if (!file.name) return "No command name.";

               let name = file.name.replace(".js", "");

               let des = client.commands.get(name).description;
               let emo = client.commands.get(name).emoji;

               let obj = {
                  cname: `${emo ? emo : ""} - \`${name}\``,
                  des,
               };

               return obj;
            });

            let dota = new Object();

            cmds.map((co) => {
               dota = {
                  name: `${cmds.length === 0 ? "In progress." : co.cname}`,
                  value: co.des ? co.des : "No Description",
                  inline: true,
               };
               catts.push(dota);
            });

            cots.push(dir.toLowerCase());
         });

         const command =
            client.commands.get(args[0].toLowerCase()) ||
            client.commands.find(
               (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
            );

         if (cots.includes(args[0].toLowerCase())) {
            return;
         }

         if (!command) {
            const embed = new MessageEmbed()
               .setTitle(
                  `Invalid command! Use \`${prefix}help\` for all of my commands!`
               )
               .setColor("RED");
            return message.channel.send({
               embeds: [embed]
            });
         }

         const embed = new MessageEmbed()
            .setTitle("Command Details:")
            .addField(
               "Command:",
               command.name ? `${command.name}` : "No name for this command."
            )
            .addField(
               "Aliases:",
               command.aliases ?
               `${command.aliases.join(" ,")}` :
               "No aliases for this command."
            )
            .addField(
               "Cooldowns:",
               command.cooldowns ? `${ms(command.cooldowns)}` : `None.`
            )
            .addField(
               "Description:",
               command.description ?
               command.description :
               "No description for this command."
            )
            .addField(
               "Usage:",
               command.usage ?
               `${prefix}${command.name} ${command.usage}` :
               `${prefix}${command.name}`
            )
            .addField(
               "Command Status:",
               command.toggleOff ? `Offline` : `Online`
            )
            .addField("DevelopersOnly:", command.developersOnly ? `Yes` : `No`)
            .addField(
               "Bot-Permissions Required:",
               command.botpermissions ?
               `${command.botpermissions.join(", ")}` :
               `None`
            )
            .addField(
               "User-Permissions Required:",
               command.userpermissions ?
               `${command.userpermissions.join(", ")}` :
               `None`
            )

            .setFooter(
               `Requested by ${message.author.tag}`,
               message.author.displayAvatarURL({
                  dynamic: true,
               })
            )
            .setTimestamp()
            .setColor("WHITE");
         return message.channel.send({
            embeds: [embed]
         });
      } catch (error) {
         console.log("Erreur : Help :: => \n", error)
      }
   },
};