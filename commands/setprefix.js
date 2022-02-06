// Import needed packages
const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const config = require("../config.json")

module.exports = {
    name : "setprefix",
    permissions : ["ADMINISTRATOR"],

    data: new SlashCommandBuilder()
        .setName("setprefix")
        .setDescription("set prefix for bot")
        .addStringOption(option =>
            option.setName('input')
                .setDescription('enter your new prefix')
                .setRequired(true)),

    async execute(client, interaction) {

        const findChannel = client.channels.cache.get(interaction.channel.id)
        const cmdEmbed = new MessageEmbed()
            .setColor(config.colors.main)
            .setDescription(interaction.options.getString("input"))
        findChannel.send({ embeds: [cmdEmbed] })
        let guildData = await client.data.getGuildDB(interaction.guild.id);
        guildData.prefix = interaction.options.getString("input");
        guildData.save().catch(err => console.log(err))

        await interaction.reply({ content: "prefix saved.", ephemeral: true })
    },

    async executeCommand(client, message) {
        let guildData = await client.data.getGuildDB(message.member.guild.id);
        message.delete()

        const messageArry = message.content.split(" ")
        const cmdEmbed = new MessageEmbed()
            .setColor(config.colors.main)

        if (messageArry[1]) {
            cmdEmbed.setDescription(message.content.replace(messageArry[0], "new prefix is: "))

            // save new prefix
            guildData.prefix = messageArry[1];
            guildData.save().then(() => {
                message.channel.send({ embeds: [cmdEmbed] })
            }).catch(err => console.log(err))

        } else {
            cmdEmbed.setDescription(`**SYNTAX**: ${guildData.prefix}setprefix [PREFIX]`)
            message.channel.send({ embeds: [cmdEmbed] }).then(msg => {
                setTimeout(() => {
                    if (msg) {
                        msg.delete().catch(() => { })
                    }
                }, 10000);
            })
        }

    }
}