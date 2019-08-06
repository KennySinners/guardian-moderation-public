const Discord = require("discord.js");
const fs = require('fs');
const mongoose = require("mongoose");
const Config = require("../../lib/mongodb");
const { Prefix } = require("../../events/message.js");

module.exports.run = async (client, message, args) => {

    if (!message.member.hasPermission('MANAGE_GUILD')) return message.reply('You dont have the following permission: MANAGE_GUILD');
    if (!message.content.split(' ').slice(1).join(" ")) return message.reply('You did not specify a prefix');

    Config.findOne({
            guildID: message.guild.id,
          }, (err, guild) => {
             if(err) return console.error(err);

             guild.prefix = message.content.split(" ").slice(1).join(" ")
             message.channel.send("Successfully changed prefix. New prefix: " + "**`" + message.content.split(" ")[1] + "`**");
             return guild.save().catch(ex => console.log(ex));
          });
}

module.exports.help = {
    name: `prefix`,
    dName: "prefix",
    desc: "changes the server prefix",
    usage: `?prefix [prefix]`,
    group: "util"
}
