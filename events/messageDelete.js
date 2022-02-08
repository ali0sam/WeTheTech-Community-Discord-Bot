const { MessageEmbed } = require("discord.js")
const config = require("../config.json")


module.exports = {
    name : "messageDelete",
    description : "Handle when a message deleted",
    async execute(client, message){

        if(!message.content || message.content == "") return; // Check if message content exist (for filter embeds)

        const logChannelId = await client.data.channel(this.name.toLowerCase()) // Get log channel id from database
        if(!logChannelId.channelId) return; // Check if channel id exist

        const logChannel = client.channels.cache.get(logChannelId.channelId) // Find channel

        const embed = new MessageEmbed()
            .setColor(config.colors.main)
            .setAuthor({name : "Log | Message Deleted", iconURL : message.guild.iconURL()})
            .setDescription(`Message for <@${message.author.id}> deleted.\n\nChannel : <#${message.channel.id}>\nContent : ${message.content}`)
            .setFooter({text : `Message for ${message.author.tag}`})
            .setTimestamp()

        if(logChannel) logChannel.send({embeds : [embed]}) // Check if channel exist and send log to channel

    }
}
