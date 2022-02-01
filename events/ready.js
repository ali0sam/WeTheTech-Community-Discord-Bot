const {REST} = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const config = require("../config.json")
const index = require("../index")

module.exports = {
    name : "ready",
    description : "When bot is ready",
    execute(client){

        console.log(`${client.user.tag} is now ready to use`)

        const CLIENT_ID = client.user.id
        const GUILD_ID = config.guilds.main
        const rest = new REST({version : "9"}).setToken(config.bot.token);

        (async () => {
            try {
                await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {body : index.commands})
                console.log(`[REG] Registered commands to ${GUILD_ID}`)
            } catch (error) {
                if(error) console.log(error)
            }
        })();

    }
}