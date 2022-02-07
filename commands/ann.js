// Import needed packages
const {SlashCommandBuilder} = require("@discordjs/builders")
const {MessageEmbed} = require("discord.js")
const config = require("../config.json")

module.exports = {
    name : "ann",
    permissions : ["ADMINISTRATOR"],
    everyoneCanUse = false,

    data : new SlashCommandBuilder()
        .setName("ann")
        .setDescription("Announce any texts")
        .addStringOption(option => option.setName('input').setDescription('The input to announce').setRequired(true)),

    async execute(client, interaction){

        const findChannel = client.channels.cache.get(interaction.channel.id)
        const annEmbed = new MessageEmbed()
            .setColor(config.colors.main)
            .setAuthor({name : "Announcement", iconURL : interaction.guild.iconURL()})
            .setDescription(interaction.options.getString("input"))
            .setFooter({text : `Sent by ${interaction.user.username}`, iconURL : interaction.user.displayAvatarURL()})
        findChannel.send({embeds : [annEmbed], content : "@everyone"})

        await interaction.reply({content : "Announcement successfully sent", ephemeral : true})
    },

    executeCommand(client, message){

        message.delete()

        const messageArry = message.content.split(" ")
        const annEmbed = new MessageEmbed()
        .setColor(config.colors.main)
        .setAuthor({name : "Announcement", iconURL : message.guild.iconURL()})
        .setFooter({text : `Sent by ${message.author.username}`, iconURL : message.author.displayAvatarURL()})

        if(messageArry[1]){
            annEmbed.setDescription(message.content.replace(messageArry[0], ""))
            message.channel.send({content : "@everyone", embeds : [annEmbed]})
        }else{
            annEmbed.setDescription(`**SYNTAX**: ${config.bot.prefix}ann [TEXT]`)
            message.channel.send({embeds : [annEmbed]}).then(msg => {
                setTimeout(() => {
                    if(msg){
                        msg.delete().catch(() => {})
                    }
                }, 10000);
            })
        }

    }
}