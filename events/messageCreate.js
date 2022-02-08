const Discord = require("discord.js")
const config = require("../config.json")


module.exports = {
    name : "messageCreate",
    description : "Handle when a user sent message",
    async execute(client, message){

        // ---------------- message comes from about channel ---------------
        const aboutChanel = await client.data.channel("about") // Get about channel id from database
        if(message.channel.id == aboutChanel.channelId){ // Check if message comes from about channel

            if(message.author.bot) return; // Check if message is not from bot
            await message.react("✅") // React to message with check emoji

        }

        // ---------------- non-slash commands ---------------
        let guildData = await client.data.getGuildDB(message.member.guild.id); // Get guild data from database

        const messageArry = message.content.split(" ") // Split message to array
        const cmd = messageArry[0].replace(guildData.prefix, "") // Get command from message

        if(!client.commands.has(cmd) || !client.commands.get(cmd).executeCommand) return; // Check if command exist and executeCommand exist

        // ----- Function for execute command
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


        const grabbedCommand = client.commands.get(cmd) // Get command detail

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

        if(!grabbedCommand.permissions && !grabbedCommand.private) { // If command is a public command (no permission needed and not private)
            executeCommand()
        }

    }
}