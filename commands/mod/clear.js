const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")){
        return message.channel.send("You do not have the authorization to do this.")
    }

    let mUser = message.mentions.users.first() || client.users.get(args[1]) || message.author;

     message.channel.messages.fetch({ limit: 100 }).then(msgs => {
       message.channel.bulkDelete(msgs.filter(m => m.author.id === mUser.id))
     })

    message.delete();

}

module.exports.help = {
    name: "clear",
    dName: "clear",
    desc: "Clears the mentioned user's messages.",
    usage: "?clear @user [amount]",
    group: "mod"
}
