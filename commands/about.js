const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const config = require("../config.json");

module.exports = {
    name : "about",
    everyoneCanUse : true,
    
    data : new SlashCommandBuilder()
        .setName("about")
        .setDescription("Get about message for other users")
        .addUserOption(option =>
            option
            .setName("user")
            .setDescription("User you want to have about message")
            .setRequired(true)
        ),

    async execute(client, interaction){
        
        const userMentioned = interaction.options.getUser("user")
        let aboutDB = await client.data.about(userMentioned.id);

        if(aboutDB && aboutDB.text){

            const userAboutEmbed = new MessageEmbed()
                .setColor(config.colors.main)
                .setFooter({name : `${userMentioned.username} | About`, iconURL : userMentioned.displayAvatarURL({dynamic : true})})
                .setDescription(aboutDB.text);
            await interaction.reply({embeds : [userAboutEmbed], ephemeral : true});


        }else{
            const errEmbed = new MessageEmbed()
                .setColor(config.colors.main)
                .setAuthor({name : "About message"})
                .setFooter({text : `${interaction.guild.name} Server`, iconURL : interaction.guild.iconURL({dynamic : true})})
                .setDescription(`**${interaction.options.getUser("user")}** has no about message`)
            await interaction.reply({embeds : [errEmbed], ephemeral: true})
        }
    }
}