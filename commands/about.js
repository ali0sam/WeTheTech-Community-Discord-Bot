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
        
        let aboutDB = await client.data.about(interaction.options.getUser("user").id);

        if(aboutDB && aboutDB.text){


            if(aboutDB.text.length <= 1900){
                await interaction.reply({ content: `**About message for ${interaction.options.getUser("user")}**\n\n${aboutDB.text}`, ephemeral: true })
            }else{
                const attachment = new Discord.MessageAttachment(Buffer.from(aboutDB.text, 'utf-8'), `about-${interaction.option.getUser("user").username}.txt`);
                await interaction.reply({files : [{attachment}], ephemeral: true});
            }


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