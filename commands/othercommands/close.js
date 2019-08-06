const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if(message.channel.name.includes(message.author.id.slice(14)) && message.author.id.includes(message.author.id.slice(14))){
        message.channel.delete()
    }

}

module.exports.help = {
  "name": "close",
  "dName": "close",
  "desc": "Closes the ticket",
  "usage": "?close (in a ticket)",
  "group": "other"
}
