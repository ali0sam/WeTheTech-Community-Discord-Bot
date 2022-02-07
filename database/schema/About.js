const mongoose = require("mongoose")
const PrivateConfig = require("../../config.json")
mongoose.set("debug", true)

const AboutSchema = mongoose.Schema({
    user : {
        type : String
    },

    text : {
        type : String
    }
})

module.exports = mongoose.model('about', AboutSchema, 'about')  