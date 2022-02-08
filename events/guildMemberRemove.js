const { MessageEmbed } = require("discord.js")
const config = require("../config.json")


module.exports = {
    name : "guildMemberRemove",
    description : "Handle when a user leave from server",
    async execute(client, member){
        
        const leaveEmbed = new MessageEmbed()
            .setColor(config.colors.main)
            .setAuthor({name : "Log | Member Leave"})
            .setDescription(`User ${member.user} [${member.user.tag}] left from server`)
            .setFooter({text : `${member.guild.name} Server`})
        
        const findChannelId = await client.data.channel(this.name) // Get channel id from database
        if(!findChannelId.channelId) return; // Check if channel id exist

        const findChannel = client.channels.cache.get(findChannelId.channelId) // Find channel
        if(findChannel) findChannel.send({embeds : [leaveEmbed]}) // Check if channel exist and send log to channel

    }
}