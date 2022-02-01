const config = require("../config.json")
const {MessageEmbed} = require("discord.js")

module.exports = {
    name : "guildMemberAdd",
    description : "Handle when a member joined to server",
    execute(client, member){

        const welcomeChannel = client.channels.cache.get(config.channels.welcome)
        if(welcomeChannel){
            const welcomeEmbed = new MessageEmbed()
            .setColor(config.embeds.color)
            .setThumbnail(member.user.displayAvatarURL({dynamic : true, size : 1024}))
            .setAuthor({name : `Welcome ${member.user.username}`})
            .setDescription(`Hey ${member.user.username} ! Khosh oomadi be server ${member.guild.name}.`)
            .setFooter({text : `${member.guild.name} Server`, iconURL : member.guild.iconURL()})
            welcomeChannel.send({embeds : [welcomeEmbed]})
        }

        const welcomeDMEmbed = new MessageEmbed()
        .setColor(config.embeds.color)
        .setAuthor({name : `خوش اومدی به ${member.guild.name}`, iconURL : member.user.displayAvatarURL({dynamic : true})})
        .setDescription(`سلام ${member.user.username}. خوش اومدی به سرور ${member.guild.name} !\n\nامیدوارم لحظات خوبی رو توی سرور داشته باشی\n\nبهت پیشنهاد میکنم به چت اصلی سرور سر بزنی <#${config.channels.generalChat}>`)
        .setThumbnail(member.guild.iconURL({dynamic : true, size : 1024}))
        .setFooter({text : `${member.guild.name} Server`, iconURL : member.guild.iconURL()})
        member.send({embeds : [welcomeDMEmbed]})
    
        // For log
        const logChannel = client.channels.cache.get(config.channels.logs.welcome)
        if(logChannel){
            const logEmbed = new MessageEmbed()
            .setColor(config.colors.main)
            .setAuthor({name : "Member Add Log"})
            .setDescription(`**User** <@${member.user.id}> [${member.user.tag}] **joined to server**`)
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp()
            logChannel.send({embeds : [logEmbed]})
        }

    }
}