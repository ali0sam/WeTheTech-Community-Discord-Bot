const { MessageEmbed } = require("discord.js");
const config = require("../config.json")

module.exports = {
    name : "channelDelete",
    description : "Handle when a channel deleted",
    async execute(client, channel){
      const logChannelId = await client.data.channel(this.name)  
      if(logChannelId && logChannelId.channelId){

        const findChannel = client.channels.cache.get(logChannelId.channelId)
        if(!findChannel) return 

        let Entry = NaN;
        try {
          const AuditLogFetch = await channel.guild.fetchAuditLogs({
            limit: 1,
            type: "CHANNEL_DELETE",
          });
          Entry = AuditLogFetch.entries.first();
        } catch {}

        const channelEmbed = new MessageEmbed()
        .setColor(config.colors.main)
        .setFooter({text : `${channel.guild.name} Server`})
        .setAuthor({name : "Log | Channel Delete"})
        .setDescription(`Channel **${channel.name}** deleted by ${Entry.executor || undefined}`)
        findChannel.send({embeds : [channelEmbed]})

      }

    }
}