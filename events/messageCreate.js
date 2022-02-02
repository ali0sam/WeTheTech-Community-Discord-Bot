const Discord = require("discord.js")
const config = require("../config.json")

module.exports = {
    name : "messageCreate",
    description : "Handle when a user sent message",
    execute(client, message){
        const messageArry = message.content.split(" ")
        const cmd = messageArry[0].replace(config.bot.prefix, "")

        if(!client.commands.has(cmd) || !client.commands.get(cmd).executeCommand) return;

        const grabbedCommand = client.commands.get(cmd)
        if(!grabbedCommand.permissions && !grabbedCommand.private) {
            try {
                grabbedCommand.executeCommand(client, message);
            } catch (error) {
                message.channel.send("This command have problem... Please contact to developers")
            }
        }

    }
}