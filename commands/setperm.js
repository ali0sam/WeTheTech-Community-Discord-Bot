const { MessageEmbed } = require("discord.js")
const config = require("../config.json")

module.exports = {
    name : "setperm",
    permissions : ['ADMINISTRATOR'],

    async executeCommand(client, message){
        // setperm command user
        const messageArry = message.content.split(" ")
        const userMention = message.mentions.users.first()
        if(userMention) messageArry[2] = userMention.id

        const embed = new MessageEmbed()
        .setColor(config.colors.main)
        .setFooter({text : `${message.guild.name} Server`, iconURL : message.guild.iconURL({dynamic : true})})
        .setAuthor({name : "Set Permission"})

        if(!messageArry[2]) return message.reply("**SYNTAX**: [prefix]setperm [command] [user]")

        const findUser = client.users.cache.get(messageArry[2])
        if(!findUser) {
            embed.setDescription(`Can't find this user`)
            return message.channel.send({embeds : [embed]})
        }

        await message.guild.commands.fetch().then(async commands => {
            const foundCmd = commands.find(cmd => cmd.name == messageArry[1].toLowerCase())

            if (!client.application?.owner) await client.application?.fetch();
    
            const command = await message.guild?.commands.fetch(foundCmd.id);
    
            const permissions = [
                {
                    id: messageArry[2],
                    type: 'USER',
                    permission: true,
                },
            ];
    
            await command.permissions.add({ permissions }).then(() => {
                embed.setDescription(`Successfully updated command **${messageArry[1]}** for user <@${messageArry[2]}>`)
                message.channel.send({embeds : [embed]})
            });
        })
        
    }
}