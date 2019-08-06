function Run() { 
    
const Discord = require("discord.js");

const client = new Discord.Client({ disableEveryone: true });

const { token, prefix } = require("./Config.json"); 

const { Admin, Mod, Dev, Util, Eco, Fun, Other, Event } = require("./bot_loader/load.js");

client.commands = new Discord.Collection();

Admin("commands/admin", client);

Mod("commands/mod", client);

Other("commands/othercommands", client);

Eco("commands/economy", client);

Fun("commands/fun", client);

Util("commands/utility", client);

Dev("commands/developer", client);

Event("events", client);

client.login(token);

}

module.exports = { Run }
