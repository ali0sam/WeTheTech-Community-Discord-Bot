// Import needed packages
const {SlashCommandBuilder} = require("@discordjs/builders")
const {MessageEmbed} = require("discord.js")
const config = require("../config.json")

module.exports = {
    data : new SlashCommandBuilder()
        .setName("ann")
        .setDescription("Announce any texts")
        .addStringOption(option =>
            option.setName('input')
                .setDescription('The input to announce')
                .setRequired(true)),

    async execute(client, interaction){

        const findChannel = client.channels.cache.get(interaction.channel.id)
        const annEmbed = new MessageEmbed()
            .setColor(config.colors.main)
            .setAuthor({name : "Announcement", iconURL : interaction.guild.iconURL()})
            .setDescription(interaction.options.getString("input"))
            .setFooter({text : `Sent by ${interaction.user.username}`, iconURL : interaction.user.displayAvatarURL()})
        findChannel.send({embeds : [annEmbed], content : "@everyone"})

        await interaction.reply({content : "Announcement successfully sent", ephemeral : true})
    }
}