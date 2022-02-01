module.exports = {
    name : "ready",
    description : "When bot is ready",
    execute(client){

        console.log(`${client.user.tag} is now ready to use`)

    }
}