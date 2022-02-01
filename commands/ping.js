// Import needed packages
const {SlashCommandBuilder} = require("@discordjs/builders")

module.exports = {
    // Build data for slash command with a description
    data : new SlashCommandBuilder().setName("ping").setDescription("Returns pong"),

    // When user used to this slash command, this code will be execute
    async execute(client, interaction){
        await interaction.reply("Pong!")
    }
}