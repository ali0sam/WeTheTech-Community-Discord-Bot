const { MessageEmbed } = require("discord.js")
const config = require("../config.json")
module.exports = {
    name : "guildMemberRemove",
    description : "Handle when a user leave from server",
    execute(client, member){
        const leaveEmbed = new MessageEmbed()
        .setColor(config.colors.main)
        .setAuthor({name : "Log | Member Leave"})
        .setDescription(`User ${member.user} [${member.user.tag}] left from server`)
        .setFooter({text : `${member.guild.name} Server`})
        
        const findChannel = client.channels.cache.get(config.channels.logs.leave)
        if(findChannel) findChannel.send({embeds : [leaveEmbed]})
    }
}