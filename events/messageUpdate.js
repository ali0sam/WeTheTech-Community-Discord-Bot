const {MessageEmbed} = require("discord.js")
const config = require("../config.json")

module.exports = {
    name : "messageUpdate",
    description : "Handle when a message updated",
    await execute(client, oldMessage, newMessage){
        if(!oldMessage.content || oldMessage.content == "") return;
        if(!newMessage.content || newMessage.content == "") return;
        if(oldMessage.content == newMessage.content) return;

        const logChannelId = await client.data.channel(this.name)
        if(!logChannelId.channelId) return;
        const logChannel = client.channels.cache.get(logChannelId.channelId)

        const logEmbed = new MessageEmbed()
        .setColor(config.colors.main)
        .setAuthor({name : "Log | Message Update"})
        .setDescription(`Message for ${message.author} updated in ${message.channel}\n\n**Old Message**: ${oldMessage.content}\n\n**New Message**: ${newMessage.content}`)
        .setTimestamp()
        .setFooter({text : `Updated by ${newMessage.author.tag}`})

        if(logChannel) logChannel.send({embeds : [logEmbed]})
    }
}
