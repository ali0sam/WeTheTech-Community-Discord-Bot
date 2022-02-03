const { MessageEmbed } = require("discord.js");
const config = require("../config.json")

module.exports = {
    name : "channelDelete",
    description : "Handle when a channel deleted",
    execute(client, channel){
        const findChannel = client.channels.cache.get(config.channels.logs.channel)
        if(!findChannel) return 

        let Entry = NaN;
        try {
          const AuditLogFetch = await newMember.guild.fetchAuditLogs({
            limit: 1,
            type: "CHANNEL_DELETE",
          });
          Entry = AuditLogFetch.entries.first();
        } catch {}

        const channelEmbed = new MessageEmbed()
        .setColor(config.colors.main)
        .setFooter({text : `${channel.guild.name} Server`})
        .setAuthor({name : "Log | Channel Delete"})
        .setDescription(`Channel *${channel.name}* deleted by ${Entry.executor || undefined} [ ${Entry.executor.id || undefined} ]`)
        findChannel.send({embeds : [channelEmbed]})
    }
}