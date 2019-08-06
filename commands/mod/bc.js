const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    return message.channel.send("You do not have the authorization to do this.")
  }

  message.channel.messages.fetch({
    limit: 100
  }).then(msgs => {
    message.channel.bulkDelete(msgs.filter(m => m.author.bot))
  })

  message.delete();

}

module.exports.help = {
  "name": "bc",
  "dName": "bc",
  "desc": "Clears all bot messages",
  "usage": "?bc",
  "group": "mod"
}