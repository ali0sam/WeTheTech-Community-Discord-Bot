const { MessageEmbed } = require("discord.js")
const config = require("../config.json")

module.exports = {
    name : "messageDelete",
    description : "Handle when a message deleted",
    execute(client, message){
        if(!message.content || message.content == "") return;

        const logChannel = client.channels.cache.get(config.channels.logs.message)
        const embed = new MessageEmbed()
        .setColor(config.colors.main)
        .setAuthor({name : "Log | Message Deleted", iconURL : message.guild.iconURL()})
        .setDescription(`Message for <@${message.author.id}> deleted.\n\nChannel : <#${message.channel.id}>\nContent : ${message.content}`)
        .setFooter({text : `Message for ${message.author.tag}`})
        .setTimestamp()

        if(logChannel) logChannel.send({embeds : [embed]})

    }
}