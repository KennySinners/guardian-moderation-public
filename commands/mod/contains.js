const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

  if(!message.member.hasPermission('MANAGE_MESSAGES')) {
    return message.channel.send("You do not have the authorization to do this.")
  } else {

    message.channel.messages.fetch({ limit: 100 }).then(msgs => {
      message.channel.bulkDelete(msgs.filter(x => x.content.toLowerCase().includes(message.content.split(" ").slice(1).join(" "))))
    })
  }

}

module.exports.help = {
  "name": "contains",
  "dName": "contains",
  "desc": "Clears all messages with a keyword inside of them",
  "usage": "?contains [keyword]",
  "group": "mod"
}
