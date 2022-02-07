// Import needed packages
const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const config = require("../config.json")

module.exports = {
    name : "setprefix",
    permissions : ["ADMINISTRATOR"],
    everyoneCanUse = false,

    data: new SlashCommandBuilder()
        .setName("setprefix")
        .setDescription("Update prefix for bot")
        .addStringOption(option =>
            option.setName('prefix')
                .setDescription('Enter your new prefix')
                .setRequired(true)),

    async execute(client, interaction) {

        let guildData = await client.data.getGuildDB(interaction.guild.id);
        guildData.prefix = interaction.options.getString("input");
        guildData.save().catch(err => console.log(err))

        await interaction.reply({ content: `Prefix changed to ${guildData.prefix}`, ephemeral: true })
    },

    async executeCommand(client, message) {
        let guildData = await client.data.getGuildDB(message.member.guild.id);
        message.delete()

        const messageArry = message.content.split(" ")
        const cmdEmbed = new MessageEmbed()
            .setColor(config.colors.main)
            .setFooter({text : `${message.guild.name} Server`, iconURL : message.guild.iconURL({dynamic : true})})
            .setAuthor({name : "Update Prefix"})

        if (messageArry[1]) {
            cmdEmbed.setDescription(`New prefix is ${messageArry[1]}`)

            // save new prefix
            guildData.prefix = messageArry[1];
            guildData.save().then(() => {
                message.channel.send({ embeds: [cmdEmbed] })
            }).catch(err => {
                console.log(err)
                cmdEmbed.setDescription(`Error for saving new prefix. Please contact to bot developers`)
                message.channel.send({embeds : [cmdEmbed]})
            })

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