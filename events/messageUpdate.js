const {MessageEmbed} = require("discord.js")
const config = require("../config.json")


module.exports = {
    name : "messageUpdate",
    description : "Handle when a message updated",

    async execute(client, oldMessage, newMessage){

        if(!oldMessage.content || oldMessage.content == "") return; // Check if old message content exist (for filter embeds)
        if(!newMessage.content || newMessage.content == "") return; // Check if new message content exist (for filter embeds)
        if(oldMessage.content == newMessage.content) return; // Check if old message content and new message content is same (for filter embeds)

        const logChannelId = await client.data.channel(this.name) // Get log channel id from database
        if(!logChannelId.channelId) return; // Check if channel id exist

        const logChannel = client.channels.cache.get(logChannelId.channelId) // Get log channel

        const logEmbed = new MessageEmbed()
            .setColor(config.colors.main)
            .setAuthor({name : "Log | Message Update"})
            .setDescription(`Message for ${message.author} updated in ${message.channel}\n\n**Old Message**: ${oldMessage.content}\n\n**New Message**: ${newMessage.content}`)
            .setTimestamp()
            .setFooter({text : `Updated by ${newMessage.author.tag}`})

        if(logChannel) logChannel.send({embeds : [logEmbed]}) // Check if channel exist and send log to channel

    }

}
