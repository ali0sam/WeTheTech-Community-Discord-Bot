const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const config = require("../config.json");

module.exports = {
    name : "links",
    description : "Get anyone's social media links",
    everyoneCanUse : true,

    data : new SlashCommandBuilder()
        .setName("links")
        .setDescription("See anyone's social media links")
        .addMentionableOption(option => 
            option.setName("user")
            .setDescription("Mention user you want to see link")
            .setRequired(true)
        ),

    async execute(client, interaction) {
        const user = await interaction.options.getMentionable("user")
        const userData = await client.data.link(user.id)
        const embed = new MessageEmbed()
            .setColor(config.colors.main)
            .setFooter({text : `${interaction.guild.name} Server`, iconURL : interaction.guild.iconURL()})
            .setAuthor({name : "User Links", iconURL : interaction.guild.iconURL()})
            .setDescription(`**${user.user.username}**'s social media links`)
            .setThumbnail(user.user.displayAvatarURL({dynamic : true, size : 1024}))
            .addField("Twitter", userData.twitter ? userData.twitter : "Not set")
            .addField("Github", userData.github ? userData.github : "Not set")
            .addField("Instagram", userData.instagram ? userData.instagram : "Not set")
            .addField("Website", userData.website ? userData.website : "Not set")
            .addField("LinkedIn", userData.linkedin ? userData.linkedin : "Not set")

        await interaction.reply({embeds : [embed], ephemeral : true})
    }
}