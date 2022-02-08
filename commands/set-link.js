const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const config = require("../config.json");

module.exports = {
    name : "set-link",
    description : "Link your social media accounts",
    everyoneCanUse : true,

    data : new SlashCommandBuilder()
        .setName("set-link")
        .setDescription("Link your social media accounts")
        .addStringOption(option =>
            option
            .setName('twitter')
            .setDescription('Your Twitter account')
        )
        .addStringOption(option => 
            option
            .setName("github")    
            .setDescription('Your Github account')
        )
        .addStringOption(option =>
            option
            .setName("instagram")
            .setDescription('Your Instagram account')
        )
        .addStringOption(option =>
            option
            .setName("website")
            .setDescription('Your Personal Website')
        )
        .addStringOption(option =>
            option
            .setName("linkedin")
            .setDescription('Your LinkedIn account')
        ),

    async execute(client, interaction){
        const twitter = interaction.options.getString("twitter")
        const github = interaction.options.getString("github")
        const instagram = interaction.options.getString("instagram")
        const website = interaction.options.getString("website")
        const linkedin = interaction.options.getString("linkedin")

        const userData = await client.data.link(interaction.user.id)

        // if user set a option then add it to userData and update the database
        if(twitter) userData.twitter = twitter
        if(github) userData.github = github
        if(instagram) userData.instagram = instagram
        if(website) userData.website = website
        if(linkedin) userData.linkedin = linkedin

        userData.save().then(() => {
            const embed = new MessageEmbed()
                .setColor(config.colors.main)
                .setFooter({text : `${interaction.guild.name} Server`, iconURL : interaction.guild.iconURL()})
                .setAuthor({name : "Link", iconURL : interaction.guild.iconURL()})
                .setDescription(`Your social media linked to your profile`)
                
            interaction.reply({embeds : [embed], ephemeral : true})
        }).catch(err => console.log(err))
    }
}