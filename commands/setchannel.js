const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const config = require("../config.json")

module.exports = {
    name : "setchannel",
    permissions : ["ADMINISTRATOR"],
    everyoneCanUse : false,

    data : new SlashCommandBuilder()
        .setName("setchannel")
        .setDescription("Update channel for logs")
        .addStringOption(option =>
            option.setName("event")
            .setDescription("Enter event name")
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
            .setDescription("Enter channel id or channel name")
            .setRequired(true)
        ),

    async execute(client, interaction) {
        const event = await interaction.options.getString("event")
        let channel = await interaction.options.getString("channel")

        const embed = new MessageEmbed()
        .setColor(config.colors.main)
        .setFooter({text : `${interaction.guild.name} Server`, iconURL : interaction.guild.iconURL()})
        .setAuthor({name : "Logs", iconURL : interaction.guild.iconURL()})

        if(!channel){
            embed.setDescription(`Channel for **${event}** is not set or channel not found`)
            return await interaction.reply({embeds : [embed], ephemeral : true})
        }

        let logChannel = await client.data.logChannel(event)
        if(logChannel) {
            const findChannel = interaction.guild.channels.cache.get(channel)
            if(findChannel){

                logChannel.channelId = channel
                logChannel.save().then(async () => {
                    embed.setDescription(`Channel for **${event}** is set to **${channel}**`)
                    await interaction.reply({embeds : [embed], ephemeral : true})
                })

            }else{
                embed.setDescription(`Channel for **${event}** is not set or channel not found`)
                await interaction.reply({embeds : [embed], ephemeral : true})
            }
        }else{
            embed.setDescription(`Channel for **${event}** is not set or channel not found`)
            await interaction.reply({embeds : [embed], ephemeral : true})
        }

    },

    async executeCommand(client, message) {
        message.channel.send("Done!")
    }
}