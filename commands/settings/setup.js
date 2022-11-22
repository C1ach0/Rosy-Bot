const Discord = require("discord.js");
const dashboard = require("discord.js-internal-dashboard");
const {
    QuickDB
} = require('quick.db');
const { languages } = require('../../botconfig/lang.json')
module.exports = {
    name: "setup",
    aliases: ["dashboard"],
    cooldowns: 3000,
    description: "Setup bot with this dashboard",
    usage: "",
    toggleOff: false,
    developersOnly: false,
    userpermissions: ["ADMINISTRATOR"],
    botpermissions: ["ADMINISTRATOR"],
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {string[]} args 
     */
    run: async (client, message, args) => {
        const db = new QuickDB({
            'table': `Guild_${message.guildId}`
        });
        const Lang = await db.get(`Language`)
        const NotPerm = client.lang["translations"]["GROUP"]["NotPerms"][Lang || "en"]
        if (!message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) return message.reply(NotPerm)

        
        const opt = {
            timeout: 150000, // OPTIONAL, defaults to 150000. Time in milliseconds of inactivity until the dashboard closes.
            startEmbed: {
                showCategoriesAndDescriptions: true, // OPTIONAL, defaults to "true". Whether or not to show category names and descriptions.
                embed: new Discord.MessageEmbed() // OPTIONAL. Design the embed here.
                    .setTitle(`Dashboard - ${client.user.username}`)
                    .setDescription("Choose a category to modify settings.")
                    .setThumbnail(client.user.displayAvatarURL({
                        dynamic: true
                    }))
                    .setColor("#ffffff"),
            },
            categoryEmbed: new Discord.MessageEmbed() // OPTIONAL. Design the embed here.
                .setTitle(`Dashboard - ${client.user.username}`)
                .setDescription("Choose a options.")
                .setThumbnail(client.user.displayAvatarURL({
                    dynamic: true
                }))
                .setColor("#ffffff"),
            closeEmbed: new Discord.MessageEmbed() // OPTIONAL. Design the embed here.
                .setTitle(`Dashboard - ${client.user.username}`)
                .setDescription(`The dashboard was closed for inactivity.`)
                .setThumbnail(client.user.displayAvatarURL({
                    dynamic: true
                }))
                .setColor("RED"),
            categories: [{
                    name: "General Settings",
                    emoji: "⚙️", // OPTIONAL. The emoji to use for the category on the selection menu.
                    description: "The general settings for the bot.",
                    settings: [{
                            name: "Prefix",
                            description: "The prefix that will be used for commands.",
                            type: "textinput", // or "textarea" for a larger text inputs.
                            maxLength: 5, // OPTIONAL. The MAXIMUM length of the textinput/textarea (if used).
                            required: false, // OPTIONAL, defaults to false. Whether or not entering a new value into the setting is required.
                            fetch: async () => {
                                // Get and return the saved value of the setting here.
                                return await db.get(`Prefix`) || client.config.prefix;
                            },
                            save: async (value) => {
                                // Save the value of the setting here.
                                await db.set(`Prefix`, value);
                            }
                        },
                        {
                            name: "Language",
                            description: `The language you would like the bot to use. || Language : \`fr\`, \`en\``,
                            type: "textinput", // or "textarea" for a larger text inputs.
                            minLength: 2,
                            maxLength: 2, // OPTIONAL. The MINIMUM length of the textinput/textarea (if used).
                            required: false, // OPTIONAL, defaults to false. Il est nécessaire de saisir ou non une nouvelle valeur dans le paramètre.
                            fetch: async () => {
                                // Get and return the saved value of the setting here.
                                const lang = await db.get("Language")
                                return (lang == "fr" ? "French" : lang == "en" ? "English" : "English") || "English";
                            },
                            save: async (value) => {
                                if(languages.includes(value.toLowerCase())) {
                                    await db.set(`Language`, value);
                                }
                            }
                        }
                    ],
                    reset: async () => {
                        // OPTIONAL. Reset the value of the setting to the default here.
                        await db.delete(`prefix`);
                        await db.delete(`Language`);
                    }
                },/*
                {
                    name: "Welcome/Goodbye Message Settings",
                    emoji: "👋",
                    description: "Customize the Welcome and Goodbye Messages.",
                    settings: [{
                            name: "Welcome Message",
                            description: "The welcome message that will be sent to new members.",
                            type: "textarea",
                            minLength: 10,
                            maxLength: 150,
                            required: false,
                            fetch: async () => {
                                return await db.get(`WelcomeMessage`) || "";
                            },
                            save: async (value) => {
                                await db.set(`WelcomeMessage`, value);
                            }
                        },
                        {
                            name: "Goodbye Message",
                            description: "The goodbye message that will be sent to members who have left the server.",
                            type: "textarea",
                            minLength: 10,
                            maxLength: 150,
                            required: false,
                            fetch: async () => {
                                return await db.get(`GoodByeMessage`) || "";
                            },
                            save: async (value) => {
                                await db.set(`GoodByeMessage`, value);
                            }
                        }
                    ],
                    reset: async () => {
                        await db.delete(`${message.guild.id}.greetings`);
                    }
                },*/
                {
                    name: "Leveling",
                    emoji: "✨",
                    description: "Customize leveling system.",
                    settings: [{
                            name: "Level System",
                            description: "Active or disable a leveling system",
                            type: "textarea",
                            minLength: 6,
                            maxLength: 7,
                            required: false,
                            fetch: async () => {
                                return await db.get(`LevelSystem`) == true ? "Enable" : "Disable" || "Disable"
                            },
                            save: async (value) => {
                                if(value.toLowerCase() == "enable") {
                                    await db.set(`LevelSystem`, true);
                                } else {
                                    await db.set(`LevelSystem`, false);
                                }
                                
                            }
                        }
                    ],
                    reset: async () => {
                        await db.delete(`LevelSystem`);
                    }
                },
                {
                    name: "RPG",
                    emoji: "🎭",
                    description: "Activate the RPG or the economy, if the 2 are activated, the games merge ...",
                    settings: [{
                            name: "RPG",
                            description: "Active or disable a RPG system",
                            type: "textarea",
                            minLength: 6,
                            maxLength: 7,
                            required: false,
                            fetch: async () => {
                                let rpg = await db.get(`RPG`)
                                let eco = await db.get('Economy')
                                if(rpg && eco) return "Fusion RPG & Economy Enable"
                                return rpg ? "Enable" : "Disable" || "Disable"
                            },
                            save: async (value) => {
                                if(value.toLowerCase() == "enable") {
                                    await db.set(`RPG`, true);
                                    if(await db.get('Economy')) {await db.set('RPG_Fusion', true)}
                                } else {
                                    await db.set(`RPG`, false);
                                    if(await db.get('Economy')) {await db.set('RPG_Fusion', false)}
                                }
                                
                            }
                        },
                        {
                            name: "Economy",
                            description: "Active or disable a Economy system",
                            type: "textarea",
                            minLength: 6,
                            maxLength: 7,
                            required: false,
                            fetch: async () => {
                                let rpg = await db.get(`RPG`)
                                let eco = await db.get('Economy')
                                if(rpg && eco) return "Fusion RPG & Economy Enable"
                                return eco ? "Enable" : "Disable" || "Disable"
                            },
                            save: async (value) => {
                                if(value.toLowerCase() == "enable") {
                                    await db.set(`Economy`, true);
                                    if(await db.get('RPG')) {await db.set('RPG_Fusion', true)}
                                } else {
                                    await db.set(`Economy`, false);
                                    if(await db.get('RPG')) {await db.set('RPG_Fusion', false)}
                                }
                                
                            }
                        }
                    ],
                    reset: async () => {
                        await db.set(`RPG`, false);
                        await db.set(`Economy`, false);
                        await db.set('RPG_Fusion', false);
                    }
                }
            ]
        }

        dashboard(message, opt)


        function Repl(text) {
            let Valid = "";

            /** User / Member
             * **************************/
            Valid = text.replace("[user]", `${member.user}`)
            Valid = Valid.replace("[user_name]", `${member.user.username}`)
            Valid = Valid.replace("[user_id]", `${member.user.id}`)
            Valid = Valid.replace("[user_tag]", `${member.user.tag}`)
            Valid = Valid.replace("[user_discrim]", `${member.user.discriminator}`)
            Valid = Valid.replace("[user_avatar]", `${member.user.avatarURL({dynamic : true})}`)

            /** Guild
             * **************************/
            Valid = Valid.replace("[server_name]", `${member.guild.name}`)
            Valid = Valid.replace("[server_id]", `${member.guild.id}`)
            Valid = Valid.replace("[server_membercount]", `${member.guild.memberCount}`)
            Valid = Valid.replace("[server_botcount]", `${member.guild.members.cache.filter(bot => bot.user.bot).size}`)
            Valid = Valid.replace("[server_icon]", `${member.guild.iconURL()}`)
            Valid = Valid.replace("[server_rolecount]", `${member.guild.roles.cache.size}`)
            Valid = Valid.replace("[server_channelcount]", `${member.guild.channels.cache.size}`)
            Valid = Valid.replace("[server_owner]", `${member.guild.members.cache.get(member.guild.ownerId)}`)
            Valid = Valid.replace("[server_owner_id]", `${member.guild.ownerId}`)
            return Valid
        }
    },
};