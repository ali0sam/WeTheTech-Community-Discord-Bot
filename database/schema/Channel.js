const mongoose = require('mongoose')
const PrivateConfig = require("../../config.json")
mongoose.set('debug', true)

const ChannelSchema = mongoose.Schema({
    event: {
        type: String,
    },

    channelId: {
        type: String,
    },
})

module.exports = mongoose.model('channels', ChannelSchema, 'channels')