const Discord = require("discord.js");
const mongoose = require("mongoose");
const Money = require("../../lib/money.js");

module.exports.run = async (client, message, args) => {

  let cash = Money.findOne({
    userID: message.author.id,
    guildID: message.guild.id
  }, (err, money) => {
    if (err) return console.log(err);

    let balance = new Discord.MessageEmbedbed()
      .setColor(message.member.highestRole.hexColor)
      .setTitle(message.member.displayName + "'s balance.")
      .setFooter("Guardian Moderation", client.user.displayAvatarURL)
      .setTimestamp();

    if (!money) {
      balance.addField("Money", "0 💸", true)
      return message.channel.send(balance);
    } else {
      balance.addField("Money", money.money + " 💸", true)
      return message.channel.send(balance);
    }
  })
}

module.exports.help = {
  "name": "balance",
  "dName": "balance",
  "desc": "Shows the user's balance",
  "usage": "?balance",
  "group": "eco"
}