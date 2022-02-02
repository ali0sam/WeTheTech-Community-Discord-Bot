const { MessageEmbed } = require("discord.js");
const config = require("../config.json")
module.exports = {
    name : "interactionCreate",
    async execute(client, interaction){
        if(!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName)

        if(!command) return;

        try {
            await command.execute(client, interaction)
        } catch (error) {
            console.log(`Get err`, error)
            const errEmbed = new MessageEmbed()
            .setColor(config.colors.main)
            .setAuthor({name : "New error found"})
            .setFooter({text : `${interaction.guild.name} Server`})
            .setDescription(`This command have problem... Please contact to developers`)
            await interaction.reply({embeds : [errEmbed], ephemeral : true})
        }
    }
}