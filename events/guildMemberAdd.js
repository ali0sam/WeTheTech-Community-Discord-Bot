const config = require("../config.json")
const {MessageEmbed} = require("discord.js")


module.exports = {
    name : "guildMemberAdd",
    description : "Handle when a member joined to server",
    async execute(client, member){

        // ---------------- Public Welcomer ---------------
        const welcomerChannel = await client.data.channel("welcomer") // Get welcomer channel from database
        if(welcomerChannel && welcomerChannel.channelId){ // Check if channel id exist

            const welcomeChannel = client.channels.cache.get(welcomeChannel.channelId) // Find channel

            const welcomeEmbed = new MessageEmbed()
                .setColor(config.colors.main)
                .setThumbnail(member.user.displayAvatarURL({dynamic : true, size : 1024}))
                .setAuthor({name : `Welcome ${member.user.username}`})
                .setDescription(`Hey ${member.user.username} ! Khosh oomadi be server ${member.guild.name}.`)
                .setFooter({text : `${member.guild.name} Server`, iconURL : member.guild.iconURL()})

            if (welcomeChannel) welcomeChannel.send({embeds : [welcomeEmbed]}) // check if channel exist and send welcomer to channel

        }  



        // ---------------- DM Welcomer ---------------
        const welcomeDMEmbed = new MessageEmbed()
            .setColor(config.colors.main)
            .setAuthor({name : `خوش اومدی به ${member.guild.name}`, iconURL : member.user.displayAvatarURL({dynamic : true})})
            .setDescription(`سلام ${member.user.username}. خوش اومدی به سرور ${member.guild.name} !\n\nامیدوارم لحظات خوبی رو توی سرور داشته باشی\n\nبهت پیشنهاد میکنم به چت اصلی سرور سر بزنی <#${config.channels.generalChat}>`)
            .setThumbnail(member.guild.iconURL({dynamic : true, size : 1024}))
            .setFooter({text : `${member.guild.name} Server`, iconURL : member.guild.iconURL()})

        member.send({embeds : [welcomeDMEmbed]}) // Send welcomerDMEmbed to member's dm (private message)
        


        // ---------------- Log Welcomer ---------------
        const logChannelId = await client.data.channel(this.name) // Get channel id from database
        if(!logChannelId || !logChannelId.channelId) return; // Check if channel id exist

        const logChannel = client.channels.cache.get(logChannelId.channelId) // Find channel
        const logEmbed = new MessageEmbed()
            .setColor(config.colors.main)
            .setAuthor({name : "Member Add Log"})
            .setDescription(`**User** <@${member.user.id}> [${member.user.tag}] **joined to server**`)
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp()
        
        if(logChannel) logChannel.send({embeds : [logEmbed]}) // check if channel exist and send log to channel


    }
}
