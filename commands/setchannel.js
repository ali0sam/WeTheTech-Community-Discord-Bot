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
            .addChoices({
                name: 'Channel Create Log', 
                value: 'channelCreate'
            })
            .addChoices({
                name: 'Channel Delete Log', 
                value: 'channelDelete'
            })
            .addChoices({
                name: 'Member Add Log', 
                value: 'guildMemberAdd'
            })
            .addChoices({
                name: 'Member Add', 
                value: 'welcomer'
            })
            .addChoices({
                name: 'Member Left Log', 
                value: 'guildMemberRemove'
            })
            .addChoices({
                name: 'Message Delete Log', 
                value: 'messageDelete'
            })
            .addChoices({
                name: 'Message Update Log', 
                value: 'messageUpdate'
            })
            .addChoices({
                name: 'About Channel', 
                value: 'about'
            })
        )

        .addChannelOption(option => 
            option.setName("channel")
            .setDescription("Mention channel you want to set")
            .setRequired(true)
        ),

    async execute(client, interaction) {
        const event = await interaction.options.getString("event")
        let channel = await interaction.options.getChannel("channel").id

        const embed = new MessageEmbed()
        .setColor(config.colors.main)
        .setFooter({text : `${interaction.guild.name} Server`, iconURL : interaction.guild.iconURL()})
        .setAuthor({name : "Logs", iconURL : interaction.guild.iconURL()})

        if(!channel){
            embed.setDescription(`Channel for **${event}** is not set or channel not found`)
            return await interaction.reply({embeds : [embed], ephemeral : true})
        }

        let logChannel = await client.data.channel(event)
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