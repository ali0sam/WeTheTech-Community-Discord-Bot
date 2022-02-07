const mongoose = require('mongoose')
const PrivateConfig = require("../../config.json")
mongoose.set('debug', true)

const LinkSchema = mongoose.Schema({
    user : {
        type : String
    },

    twitter: {
        type: String,
        default: null
    },

    github : {
        type : String,
        default: null
    },

    instagram : {
        type : String,
        default: null
    },

    website : {
        type : String,
        default: null
    },

    linkedIn : {
        type : String,
        default: null
    }
})

module.exports = mongoose.model('links', LinkSchema, 'links')