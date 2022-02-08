const Discord = require("discord.js")
const config = require("../config.json")


module.exports = {
    name : "messageReactionAdd",
    description : "Handle when a reaction added to a message",

    async execute(client, react, user){

        if(user.bot) return; // Check if user is bot

        const aboutChannel = await client.data.channel("about") // get about channel id from database
        const reactChannel = react.message.channelId // get react channel id

        if(reactChannel == aboutChannel.channelId){ // check if react channel is about channel
            if(react.emoji.name !== "✅") return; // check if emoji is ✅

            const findUser = react.message.guild.members.cache.get(user.id) // find user who reacted
            if(!findUser) return; // Check if user exist

            const isUserHaveAdministrator = findUser.permissions.has( Discord.Permissions.FLAGS.ADMINISTRATOR ) // check if user have administrator permission
            if(!isUserHaveAdministrator) return;

            await react.remove() // If user have administrator permission then delete reaction comes from user

            const aboutDB = await client.data.about(react.message.author.id) // get about data for user from database
            aboutDB.text = react.message.content // Update user's about message to new one
            aboutDB.save().then(() => {

                const embed = new Discord.MessageEmbed()
                    .setColor(config.colors.main)
                    .setDescription(`:white_check_mark: Your about text has been accepted by ${user}`)
                react.message.reply({embeds : [embed]})

            }).catch(err => console.log(err))

        }

    }
}