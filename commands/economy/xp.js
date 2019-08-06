const Discord = require("discord.js");
const mongoose = require("mongoose");
const Xp = require("../../lib/xp.js");

module.exports.run = async (client, message, args) => {

    let mUser = message.mentions.users.first() || client.users.get(args[0]) || message.author;

    let cash = Xp.findOne({
        userID: mUser.id,
        guildID: message.guild.id
    }, (err, xp) => {
        if (err) return console.log(err);

        let xp2 = new Discord.MessageEmbedbed()
            .setColor(message.guild.member(mUser).highestRole.hexColor)
            .setTitle(message.guild.member(mUser).displayName + "'s xp.")
            .setFooter("Guardian Moderation", client.user.displayAvatarURL)
            .setTimestamp();

        if (!xp) {
            xp2.addField("XP", "0xp", true)
            return message.channel.send(xp2);
        } else {
            xp2.addField("XP", xp.xp + "xp", true)
            return message.channel.send(xp2);
        }
    })
}

module.exports.help = {
    "name": "xp",
    "dName": "xp",
    "desc": "Shows the user's xp",
    "usage": "?xp",
    "group": "eco"
}