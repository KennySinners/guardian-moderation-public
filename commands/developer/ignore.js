const Discord = require("discord.js");
const mongoose = require("mongoose");
const Guild = require("../../lib/ignored_guilds");

module.exports.run = async (client, message, args) => {

    if (message.author.id !== "575108662457139201") {
        return;
    }

    Guild.findOne({
        userID: message.author.id
    }, (err, y) => {
        if (err) return console.error(err);

        if (!y) {
            const newGuild = new Guild({
                userID: message.author.id,
                guildID: [`${message.guild.id}`]
            })
            newGuild.save();
        } else if (y.guild.includes(message.guild.id)) {
           return message.channel.send("This guild is already ignored.")
        } else {
            y.guild.push(message.guild.id)
            y.save();
        }

        message.channel.send(`Successfully added ${message.guild.name} to the ignored guilds database.`)
    })



}

module.exports.help = {
    "name": "ignore",
    "dName": "ignore",
    "desc": "Ignores the guild the command was ran in",
    "usage": "?ignore",
    "group": "dev"
}