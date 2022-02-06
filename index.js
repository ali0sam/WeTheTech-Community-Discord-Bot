// Require needed packages
const Discord = require("discord.js");
const fs = require("fs");
const mongoose = require("mongoose");
const config = require("./config.json");



// Create main client
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS
  ],
});

// Connect to database and run bot after connection
client.data = require("./database/mongoDB.js")

mongoose.connect(config.database.SRV).then(() => {
  console.log("Connected to database");
  // Run bot using token in config.json file
  client.login(config.bot.token);
  console.log("Bot is running");
}).catch(err => {
  console.log(err);
});



// Get .js files in command and event directory
console.log(`[REGISTERING] Registering events and commands`);
const commandsDir = fs.readdirSync("./commands").filter((file) => file.endsWith(".js"));
const eventsDir = fs.readdirSync("./events").filter((file) => file.endsWith(".js"));

// For register and storing commands and events
client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.slashCommands = new Discord.Collection();

const commands = []

for (const commandFile of commandsDir) {
  const requireCommand = require(`./commands/${commandFile}`)
  commands.push(requireCommand.data.toJSON())
  client.commands.set(requireCommand.data.name, requireCommand)
}

// Add events from events directory to client.events and add listener to it
for (const eventFile of eventsDir) {
  const requireEvent = require(`./events/${eventFile}`);

  if (requireEvent.execute && requireEvent.name) {
    client.events.set(requireEvent.name, requireEvent);
    client.on(requireEvent.name, (arg1, arg2, arg3) => { requireEvent.execute(client, arg1, arg2, arg3); });
  } else {
    console.log(`[REG] Can't register event ${eventFile}`)
  }
}

client.on("messageCreate", message => {
  if (message.content == "~reload") {
    if (!config.bot.developers.includes(message.author.id)) return;
    client.destroy() // This line destroy bot and when bot destroyed, source rerun cause run.bat have unlimited loop
  }
})

module.exports.commands = commands;