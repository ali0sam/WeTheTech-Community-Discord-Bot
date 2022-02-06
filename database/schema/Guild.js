const mongoose = require('mongoose')
const PrivateConfig = require("../../config.json")
mongoose.set('debug', true)

const GuildSchema = mongoose.Schema({
    _id: { // GUILD ID
        type: String
    },
    prefix: {
        type: String,
        default: PrivateConfig.bot.prefix
    }
})

module.exports = mongoose.model('guilds', GuildSchema, 'guilds')