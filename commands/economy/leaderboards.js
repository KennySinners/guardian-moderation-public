const Discord = require("discord.js");
const mongoose = require("mongoose");
const Xp = require("../../lib/xp");

module.exports.run = async (client, message, args) => {

    global.embed = new Discord.MessageEmbed()

    embed.setColor("WHITE")
    embed.setTitle(`Users with the highest XP in ${message.guild.name}`)
    embed.setFooter("Guardian Moderation", client.user.displayAvatarURL)
    embed.setTimestamp()

    let test = await Xp.find({
        guildID: message.guild.id
    }).sort({
        xp: -1
    }).limit(5)

    let i = 0;

    test.forEach(s => {

        i = i + 1;

        embed.addField(`${i}.`, `<@${s.userID}>: ${s.xp}xp`)

    })
    message.channel.send(embed)
}


module.exports.help = {
    "name": "leaderboards",
    "dName": "leaderboards",
    "desc": "Shows the members with the highest XP in the server",
    "usage": "?leaderboards",
    "group": "eco"
}