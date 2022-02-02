const { MessageEmbed } = require("discord.js")
const config = require("../config.json")

module.exports = {
    name : "messageReactionAdd",
    descrpition : "Handle when a reaction added",
    async execute(client, reaction, user){
        if(reaction.emoji.name == "✅" && reaction.channelId == config.channels.introduction && !user.bot){
            const reactionChannel = client.channels.cache.get(reaction.message.channelId)
            const fetchedMessage = await reactionChannel.messages.fetch(reaction.message.id)

            fetchedMessage.delete()
            const embed = new MessageEmbed()
            .setColor(config.colors.main)
            .setDescription(`**Introduction for ${fetchedMessage.author}**\n\n${fetchedMessage.content}`)
            .setThumbnail(fetchedMessage.author.displayAvatarURL({dynamic : true, size : 1024}))
            .setFooter({text : `Sent by ${fetchedMessage.author.tag}`})
            reactionChannel.send({embeds : [embed]})
        }
    }
}