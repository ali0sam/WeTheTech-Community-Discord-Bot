// Import needed packages
const {SlashCommandBuilder} = require("@discordjs/builders")
const {MessageEmbed} = require("discord.js")
const config = require("../config.json")

module.exports = {
    name : "say",
    permissions : ["ADMINISTRATOR"],

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
    },

   async executeCommand(client, message){
        let guildData = await client.data.getGuildDB(message.member.guild.id);
        message.delete()

        const messageArry = message.content.split(" ")
        const annEmbed = new MessageEmbed()
        .setColor(config.colors.main)

        if(messageArry[1]){
            annEmbed.setDescription(message.content.replace(messageArry[0], ""))
            message.channel.send({embeds : [annEmbed]})
        }else{
            annEmbed.setDescription(`**SYNTAX**: ${guildData.prefix}say [TEXT]`)
            message.channel.send({embeds : [annEmbed]}).then(msg => {
                setTimeout(() => {
                    if(msg){
                        msg.delete().catch(() => {})
                    }
                }, 10000);
            })
        }

    }
}