const { MessageEmbed } = require("discord.js");
const config = require("../config.json")


module.exports = {
    name : "interactionCreate",
    async execute(client, interaction){

        if(!interaction.isCommand()) return; // Check if interaction is command

        const command = client.commands.get(interaction.commandName) // Get command detail

        if(!command) return; // Check if command exist

        try { // Try for execute command

            await command.execute(client, interaction) // Execute command

        } catch (error) { // If can't execute commands

            console.log(`Get err`, error)
            const errEmbed = new MessageEmbed()
                .setColor(config.colors.main)
                .setAuthor({name : "New error found"})
                .setFooter({text : `${interaction.guild.name} Server`})
                .setDescription(`This command have problem... Please contact to developers`)

            await interaction.reply({embeds : [errEmbed], ephemeral : true}) // Send message to user with error message (not error detail)

        }
        
    }
}