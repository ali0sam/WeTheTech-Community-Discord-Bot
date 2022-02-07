const Discord = require("discord.js")
const config = require("../config.json")

module.exports = {
    name : "messageReactionAdd",
    description : "Handle when a reaction added to a message",

    async execute(client, react, user){
        const aboutChannel = await client.data.channel("about")
        const reactChannel = react.message.channelId
        if(reactChannel == aboutChannel.channelId){
            if(react.emoji.name == "✅"){

                const findUser = react.message.guild.members.cache.get(user.id)
                if(!findUser) return;

                const isUserHaveAdministrator = findUser.permissions.has( Discord.Permissions.FLAGS.ADMINISTRATOR )
                if(!isUserHaveAdministrator) return await react.delete();

                const aboutDB = await client.data.about(react.message.author.id)
                aboutDB.text = react.message.content
                aboutDB.save().then(() => {
                    const embed = new Discord.MessageEmbed()
                        .setColor(config.colors.main)
                        .setDescription(`:white_check_mark: Your about text has been accepted by ${user}`)
                    react.message.reply({embeds : [embed]})
                }).catch(err => console.log(err))

            }
        }
    }
}