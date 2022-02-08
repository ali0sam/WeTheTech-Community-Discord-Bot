const { MessageEmbed } = require("discord.js");
const config = require("../config.json")


module.exports = {
    name : "channelDelete",
    description : "Handle when a channel deleted",
    async execute(client, channel){
      const logChannelId = await client.data.channel(this.name) // Get channel id from database
      if(!logChannelId || !logChannelId.channelId) return; // Check if channel id exist

      const findChannel = client.channels.cache.get(logChannelId.channelId) // Find channel
      if(!findChannel) return // Check if channel exist 

      let Entry = NaN; // Set log entry to NaN
      try { // Try to get log entry

        const AuditLogFetch = await channel.guild.fetchAuditLogs({
          limit: 1,
          type: "CHANNEL_DELETE",
        });

        Entry = AuditLogFetch.entries.first(); // Set log entry to first entry

      } catch {}

      const channelEmbed = new MessageEmbed()
        .setColor(config.colors.main)
        .setFooter({text : `${channel.guild.name} Server`})
        .setAuthor({name : "Log | Channel Delete"})
        .setDescription(`Channel **${channel.name}** deleted by ${Entry.executor || undefined}`)

      findChannel.send({embeds : [channelEmbed]}) // Send log to channel


    }
}