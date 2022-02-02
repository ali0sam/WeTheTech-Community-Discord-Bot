const Discord = require("discord.js")
const config = require("../config.json")

module.exports = {
    name : "messageCreate",
    description : "Handle when a user sent message",
    async execute(client, message){
        const messageArry = message.content.split(" ")
        const cmd = messageArry[0].replace(config.bot.prefix, "")

        if(!client.commands.has(cmd) || !client.commands.get(cmd).executeCommand) return;

        const grabbedCommand = client.commands.get(cmd)
        if(!grabbedCommand.permissions && !grabbedCommand.private) {
            try {
                grabbedCommand.executeCommand(client, message);
            } catch (error) {
                const errEmbed = new Discord.MessageEmbed()
                .setColor(config.colors.main)
                .setAuthor({name : "New error found"})
                .setFooter({text : `${message.guild.name} Server`})
                .setDescription(`This command have problem... Please contact to developers`)
                message.channel.send({embeds : [errEmbed]})
            }
        }


        if(message.channel.id == config.channels.introduction && !message.author.bot){
            await message.react(":white_check_mark:")
        }
    }
}