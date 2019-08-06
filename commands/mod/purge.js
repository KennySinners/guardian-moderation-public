const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

  let amount = args[0];

  if(isNaN(args[0])) {
    return message.channel.send("That is not a valid number.")
  }

  if(!amount) {
    message.channel.fetchMessages({ limit: 15 }).then(msgs => {
      message.channel.bulkDelete(msgs)
    })
  } else {
    message.channel.fetchMessages({ limit: amount }).then(msgs => {
      message.channel.bulkDelete(msgs)
    })
  }

}

module.exports.help = {
  "name": "purge",
  "dName": "purge",
  "desc": "Purges all the messages in the chat",
  "usage": "?purge [amount]",
  "group": "mod"
}
