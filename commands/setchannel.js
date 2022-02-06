const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name : "setchannel",
    permissions : ["ADMINISTRATOR"],

    data : new SlashCommandBuilder()
        .setName("setchannel")
        .setDescription("Update channel for logs")
        .addStringOption(option =>
            option.setName("name")
            .setDescription("Enter name for channel")
            .setRequired(true)
            .addChoice("channel create", "channelCreate")
            .addChoice("channel delete", "channelDelete")
            .addChoice("member add", "guildMemberAdd")
            .addChoice("member left", "guildMemberRemove")
        )

        .addStringOption(option => 
            option.setName("channel")
            .setDescription("Enter channel id or mention it")
            .setRequired(true)
        ),

    async execute(client, interaction) {
        await interaction.reply("Done!")
    },

    async executeCommand(client, message) {
        message.channel.send("Done!")
    }
}