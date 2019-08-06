const Discord = require("discord.js");
const mongoose = require("mongoose");
const Channel = require("../../lib/ignored_channels");

module.exports.run = async (client, message, args) => {

    if(message.author.id !== "575108662457139201") { return; }

    if(!message.member.hasPermission("MANAGE_CHANNELS")) {
        return message.channel.send("Insufficient permision.")
    }

    let mChannel = message.mentions.channels.first() || message.channel;

    Channel.findOne({
        guildID: message.guild.id
    }, (err, channel) => {
        if(err) return console.error(err);

        if(!channel) {
            const newChn = new Channel({
                guildID: message.guild.id,
                channel: [`${mChannel.id}`]
            })
            newChn.save();
        }else if(channel.channel.includes(mChannel.id)) {

            return message.channel.send("This channel is already ignored!")

        } else{
            channel.channel.push(mChannel.id)
            channel.save();
        }

        message.channel.send(`Successfully ignored ${mChannel.name}`)
    })

}

module.exports.help = {
  "name": "ignorechannel",
  "dName": "ignorechannel",
  "desc": "Ignores the specified channel",
  "usage": "?ignore [@channel]",
  "group": "util"
}
