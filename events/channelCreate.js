const { MessageEmbed } = require("discord.js");
const config = require("../config.json")

module.exports = {
    name : "channelCreate",
    description : "Handle when a channel created",
    async execute(client, channel){
        const logChannelId = await client.data.channel(this.name)
        if(logChannelId && logChannelId.channelId){

          const findChannel = client.channels.cache.get(logChannelId.channelId)
          if(!findChannel) return;

          let Entry = NaN;
          try {
            const AuditLogFetch = await channel.guild.fetchAuditLogs({
              limit: 1,
              type: "CHANNEL_CREATE",
            });
            Entry = AuditLogFetch.entries.first();
          } catch (e){console.log(e)}

          const logEmbed = new MessageEmbed()
          .setColor(config.colors.main)
          .setFooter({text : `${channel.guild.name} Server`})
          .setAuthor({name : "Log | Channel Create"})
          .setDescription(`Channel ${channel} [ ${channel.name} ] created by ${Entry.executor || undefined}`)
          findChannel.send({embeds : [logEmbed]})

        }

    }
}