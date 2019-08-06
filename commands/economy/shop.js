const Discord = require("discord.js");
const mongoose = require("mongoose");

module.exports.run = async (client, message, args) => {

    let shop = new Discord.MessageEmbedbed()
    .setColor("RANDOM")
    .setTitle("Items in the shop")
    .addField("Knife", "$250", true)
    .addField("Pistol", "$1000", true)
    .addField("Rifle", "$2000", true)
    .addField("Crossbow", "$750", true)
    .setFooter(message.guild.name, message.guild.iconURL)
    .setTimestamp()
    
    return message.channel.send(shop);
 
}

module.exports.help = {
  "name": "shop",
  "dName": "shop",
  "desc": "Shows all the buyable items in the shop",
  "usage": "?shop",
  "group": "eco"
}
