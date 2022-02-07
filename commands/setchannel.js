const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name : "setchannel",
    permissions : ["ADMINISTRATOR"],
    everyoneCanUse = false,

    data : new SlashCommandBuilder()
        .setName("setchannel")
        .setDescription("Update channel for logs")
        .addStringOption(option =>
            option.setName("name")
            .setDescription("Enter name for channel")
            .setRequired(true)
            .addChoice("Channel Create", "channelCreate")
            .addChoice("Channel Delete", "channelDelete")
            .addChoice("Member Add", "guildMemberAdd")
            .addChoice("Member Left", "guildMemberRemove")
            .addChoice("Message Delete", "messageDelete")
            .addChoice("Message Update", "messageUpdate")
        )

        .addStringOption(option => 
            option.setName("channel")
            .setDescription("Enter channel id or mention it")
            .setRequired(true)
        ),

    async execute(client, interaction) {
        console.log(interaction.getString("name"))
    },

    async executeCommand(client, message) {
        message.channel.send("Done!")
    }
}