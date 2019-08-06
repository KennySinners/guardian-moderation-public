const Discord = require("discord.js");
const mongoose = require("mongoose");
const Money = require("../../lib/money");

module.exports.run = async (client, message, args) => {

    global.embed = new Discord.MessageEmbedbed()

    embed.setColor("WHITE")
    embed.setTitle(`Richest users in ${message.guild.name}`)
    embed.setFooter("Guardian Moderation", client.user.displayAvatarURL)
    embed.setTimestamp()

    let test = await Money.find({
        guildID: message.guild.id
    }).sort({
        money: -1
    }).limit(5)

    let i = 0;

    test.forEach(s => {

        i = i + 1;

        embed.addField(`${i}.`, `<@${s.userID}>: $${s.money}`)

    })
    message.channel.send(embed)
}


module.exports.help = {
    "name": "richest",
    "dName": "richest",
    "desc": "Shows the richest members in the server",
    "usage": "?richest",
    "group": "eco"
}