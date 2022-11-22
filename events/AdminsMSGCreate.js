const client = require("../index");

client.on("messageCreate", async (message) => {
    if (
        message.author.bot ||
        !message.content.toLowerCase().startsWith(client.config.prefix_op) ||
        message.author.id !== client.config.OwnerId 
    )
        return;

    const [cmd, ...args] = message.content
        .slice(client.config.prefix_op.length)
        .trim()
        .split(" ");

    const admin = client.admins.get(cmd.toLowerCase()) || client.admins.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!admin) return;
    await admin.run(client, message, args);
});
