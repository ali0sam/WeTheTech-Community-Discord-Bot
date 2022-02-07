const Discord = require("discord.js")
const config = require("../config.json")

module.exports = {
    name : "messageCreate",
    description : "Handle when a user sent message",
    async execute(client, message){

        const aboutChanel = await client.data.channel("about")
        if(message.channel.id == aboutChanel.channelId){
            if(message.author.bot) return;
            await message.react("✅")
        }

        let guildData = await client.data.getGuildDB(message.member.guild.id);

        const messageArry = message.content.split(" ")
        const cmd = messageArry[0].replace(guildData.prefix, "")

        if(!client.commands.has(cmd) || !client.commands.get(cmd).executeCommand) return;

        function executeCommand() {
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

        const grabbedCommand = client.commands.get(cmd)

        if(grabbedCommand.permissions){ // Command have a permission[s]
            if(typeof grabbedCommand.permissions == "object"){ // If command have multi permission
                for (const permission of grabbedCommand.permissions){
                    if(message.member.permissions.has( Discord.Permissions.FLAGS[permission] )) return executeCommand();
                }
            }else{ // If command have one permission
                if(message.member.permissions.has( Discord.Permissions.FLAGS[grabbedCommand.permission] )) return executeCommand();
            }
            return false
        }

        if(!grabbedCommand.permissions && !grabbedCommand.private) {
            executeCommand()
        }

        if(message.channel.id == config.channels.introduction && !message.author.bot){
            await message.react(":white_check_mark:")
        }
    }
}