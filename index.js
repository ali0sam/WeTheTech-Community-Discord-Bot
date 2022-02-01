// Require needed packages
const Discord = require("discord.js");
const { resolveNaptr } = require("dns");
const fs = require("fs");
const config = require("./config.json");

// Create main client
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
  ],
});

// Get .js files in command and event directory
console.log(`[REGISTERING] Registering events and commands`);
const commandsDir = fs.readdirSync("./commands").filter((file) => file.endsWith(".js"));
const eventsDir = fs.readdirSync("./events").filter((file) => file.endsWith(".js"));

// For register and storing commands and events
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

// Add events from events directory to client.events and add listener to it
for (const eventFile of eventsDir) {
  const requireEvent = require(`./events/${eventFile}`);

  if (requireEvent.execute && requireEvent.name) {
    client.events.set(requireEvent.name, requireEvent);
    client.on(requireEvent.name, (arg1, arg2, arg3) => { requireEvent.execute(client, arg1, arg2, arg3); });
  }else{
    console.log(`[REG] Can't register event ${eventFile}`)
  }
}

client.on("messageCreate", message => {
  if(message.content == "~reload"){
    if(!config.bot.developers.includes(message.author.id)) return;
    client.destroy() // This line destroy bot and when bot destroyed, source rerun cause run.bat have unlimited loop
  }
})

// Run bot using token in config.json file
client.login(config.bot.token);
