const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const config = require("../config.json")

module.exports = {
    name : "setperm",
    permissions : ['ADMINISTRATOR'],
    everyoneCanUse : false,

    data : new SlashCommandBuilder()
    .setName("setperm")
    .setDescription(`Give and remove access to commands for a user`)
    .addStringOption(option => option
        .setName("user")
        .setDescription("Enter user id")
        .setRequired(true)
    ).addStringOption(option => option
        .setName("command")
        .setDescription("Enter command name")
        .setRequired(true)
    ).addStringOption(option => option
        .setName("action")
        .setDescription("Enter action")
        .setRequired(true)
        .addChoice("Give Access", "give")
        .addChoice("Remove Access", "remove")
    ),

    async execute(client, interaction) {
        const userId = await interaction.options.getString("user")
        const targetCommand = await interaction.options.getString("command")
        const action = await interaction.options.getString("action")

        const embed = new MessageEmbed()
        .setColor(config.colors.main)
        .setFooter({text : `${interaction.guild.name} Server`, iconURL : interaction.guild.iconURL()})
        .setAuthor({name : "Logs", iconURL : interaction.guild.iconURL()})

        const findUser = interaction.guild.members.cache.get(userId)
        if(findUser){

            await interaction.guild.commands.fetch().then(async commands => { // Get all commands in guild
                const foundCmd = commands.find(cmd => cmd.name == targetCommand) // Get target command
    
                if(!foundCmd){ // Check if command exist
                    embed.setDescription(`Can't find this command`)
                    return interaction.reply({embeds : [embed], ephemeral : true})
                }
    
                if (!client.application?.owner) await client.application?.fetch(); // I dont know about this line :))))))
        
                const command = await interaction.guild?.commands.fetch(foundCmd.id); // Get target command
        
                const permissions = [ // Needed permission
                    {
                        id: userId,
                        type: 'USER',
                        permission: true,
                    },
                ];
    
                if(action == "remove") permissions[0].permission = false // If user want to remove permission, set permission to false
        
                await command.permissions.add({ permissions }).then(async () => { // Update permission
                    embed.setDescription(`Successfully updated command **${targetCommand}** for user <@${userId}> [Action : ${action}]`)
                    await interaction.reply({embeds : [embed], ephemeral : true})
                });
            })

        }else{
            embed.setDescription(`User not found`)
            return await interaction.reply({embeds : [embed], ephemeral : true})
        }
    },

    async executeCommand(client, message){
        const messageArry = message.content.split(" ")
        const userMention = message.mentions.users.first()
        if(userMention) messageArry[2] = userMention.id // set user id to 3rd argument (does not matter if user is mentioned or not)

        const embed = new MessageEmbed()
        .setColor(config.colors.main)
        .setFooter({text : `${message.guild.name} Server`, iconURL : message.guild.iconURL({dynamic : true})})
        .setAuthor({name : "Set Permission"})

        if(!messageArry[2]) {
            embed.setDescription("**SYNTAX**: [prefix]setperm [command] [user] [disable/enable]")
            return message.channel.send({embeds : [embed]})
        }

        if(!messageArry[3]) messageArry[3] = true // Enable access for user or disable, if true it's enable, if false it's disable
        if(typeof messageArry[3] == "string" && messageArry[3].toLowerCase() == "enable") messageArry[3] = true // if user enter enable, it will give permission to user
        if(typeof messageArry[3] == "string" && messageArry[3].toLowerCase() == "disable") messageArry[3] = false // if user enter disable, it will remove permission from user

        const findUser = client.users.cache.get(messageArry[2]) // Check if user exist
        if(!findUser) {
            embed.setDescription(`Can't find this user`)
            return message.channel.send({embeds : [embed]})
        }

        await message.guild.commands.fetch().then(async commands => { // Get all commands in guild
            const foundCmd = commands.find(cmd => cmd.name == messageArry[1].toLowerCase()) // Get target command

            if(!foundCmd){ // Check if command exist
                embed.setDescription(`Can't find this command`)
                return message.channel.send({embeds : [embed]})
            }

            if (!client.application?.owner) await client.application?.fetch(); // I dont know about this line :))))))
    
            const command = await message.guild?.commands.fetch(foundCmd.id); // Get target command
    
            const permissions = [ // Needed permission
                {
                    id: messageArry[2],
                    type: 'USER',
                    permission: true,
                },
            ];

            if(!messageArry[3]) permissions[0].permission = false // If user want to remove permission, set permission to false
    
            await command.permissions.add({ permissions }).then(() => { // Update permission
                embed.setDescription(`Successfully updated command **${messageArry[1]}** for user <@${messageArry[2]}> [Give access : ${messageArry[3]}]`)
                message.channel.send({embeds : [embed]})
            });
        })
        
    }
}