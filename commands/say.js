// Import needed packages
const {SlashCommandBuilder} = require("@discordjs/builders")
const {MessageEmbed} = require("discord.js")
const config = require("../config.json")

module.exports = {
    data : new SlashCommandBuilder()
        .setName("say")
        .setDescription("Echo any texts")
        .addStringOption(option =>
            option.setName('input')
                .setDescription('The input to echo')
                .setRequired(true)),

    async execute(client, interaction){

        const findChannel = client.channels.cache.get(interaction.channel.id)
        const annEmbed = new MessageEmbed()
            .setColor(config.colors.main)
            .setDescription(interaction.options.getString("input"))
        findChannel.send({embeds : [annEmbed]})

        await interaction.reply({content : "Say successfully sent", ephemeral : true})
    }
}