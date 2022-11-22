const client = require("../index");
const chalk = require("chalk");
const {
  version: discordjsVersion
} = require("discord.js");
const Discord = require('discord.js')
const {
  prefix
} = require("../botconfig/main.json");
const main_json = require("../botconfig/main.json");
const lib = require('../script/function')

client.on("ready", async () => {
  const supportServer = client.guilds.cache.get(`${main_json.TestingServerID}`);
  if (!supportServer) return console.log(chalk.white("["),
    chalk.green.bold("Support Server"),
    chalk.white("]"),
    chalk.gray(" : "),
    chalk.white.bold("Bot isn't on support server"));
  // ———————————————[Status]———————————————
  client.user.setActivity(
    `${prefix}help || ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} ${
      client.guilds.cache.reduce((a, b) => a + b.memberCount, 0) > 1
          ? "Users"
          : "User"
    }`, {
      type: "WATCHING"
    }
  );
  const statuses = [
    () => `${prefix}help || ${client.guilds.cache.size} ${
      client.guilds.cache.size > 1 ? "Servers" : "Server"
    }`,
    () => `${prefix}help || ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} ${
      client.guilds.cache.reduce((a, b) => a + b.memberCount, 0) > 1
        ? "Users"
        : "User"
    }`,
  ]
  let i = 0

  setInterval(() => {
    client.user.setActivity(
      statuses[i](), {
        type: "WATCHING"
      }
    );
  }, 10 * 60 * 1000);

  // ———————————————[Ready MSG]———————————————
  console.log(chalk.green.bold("Success!"));
  console.log(chalk.gray("Connected To"), chalk.yellow(`${client.user.tag}`));
  console.log(chalk.gray("Connected At"), chalk.white.bold(`${lib.consoleDate()}`));
  console.log(
    chalk.white("Watching"),
    chalk.red(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}`),
    chalk.white(
      `${
        client.guilds.cache.reduce((a, b) => a + b.memberCount, 0) > 1
          ? "Users,"
          : "User,"
      }`
    ),
    chalk.red(`${client.guilds.cache.size}`),
    chalk.white(`${client.guilds.cache.size > 1 ? "Servers." : "Server."}`)
  );
  console.log(
    chalk.white(`Prefix:` + chalk.red(` ${prefix}`)),
    chalk.white("||"),
    chalk.red(`${client.commands.size}`),
    chalk.white(`Commands`)
  );
  console.log(
    chalk.white(`Support-Server: `) +
    chalk.red(`${supportServer.name || "None"}`)
  );
  console.log("");
  console.log(chalk.red.bold("——————————[Statistics]——————————"));
  console.log(
    chalk.gray(
      `Discord.js Version: ${discordjsVersion}\nRunning on Node ${process.version} on ${process.platform} ${process.arch}`
    )
  );
  console.log(
    chalk.gray(
      `Memory: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(
        2
      )} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
        2
      )} MB`
    )
  );
});
