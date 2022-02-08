const config = require("../config.json")
const index = require("../index")

module.exports = {
    name : "ready",
    description : "When bot is ready",
    async execute(client){

        console.log(`Connected to bot ${client.user.tag}`)

        // ------------ Register slash commands ------------
        const guild = client.guilds.cache.get(config.guilds.main)
        await guild.commands.set(index.commands)

    }
}