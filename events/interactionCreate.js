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
            await interaction.reply({content : "This command have problem... Please contact to developers", ephemeral : true})
        }
    }
}