const { MessageEmbed } = require("discord.js");
const config = require("../config.json")

module.exports = {
    name : "channelCreate",
    description : "Handle when a channel created",
    execute(client, channel){
        const findChannel = client.channels.cache.get(config.channels.logs.channel)
        if(!findChannel) return;

        let Entry = NaN;
        try {
          const AuditLogFetch = await newMember.guild.fetchAuditLogs({
            limit: 1,
            type: "CHANNEL_CREATE",
          });
          Entry = AuditLogFetch.entries.first();
        } catch {}

        const logEmbed = new MessageEmbed()
        .setColor(config.colors.main)
        .setFooter({text : `${channel.guild.name} Server`})
        .setAuthor({name : "Log | Channel Create"})
        .setDescription(`Channel ${channel} [ ${channel.name} ] created by ${Entry.executor || undefined} [ ${Entry.executor.id || undefined} ]`)
        findChannel.send({embeds : [logEmbed]})
    }
}