const Discord = require("discord.js");
const fs = require('fs');
const {
    ticketsArray
} = require("../../Config.json");
const mongoose = require("mongoose");
const Config = require("../../lib/mongodb");

module.exports.run = async (client, message, args) => {

    message.delete(2000);

    let infoEmbed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, client.user.displayAvatarURL)
        .setThumbnail(message.author.displayAvatarURL)
        .setFooter("Guardian Moderation", client.user.displayAvatarURL)
        .setTimestamp()

    let array_messages = [];
    let bot_array = [];

    const filter = m => m.author.id === message.author.id;
    const collector = message.channel.createMessageCollector(filter);
    const kollector = message.channel.createMessageCollector(filter);

    if (!message.guild.channels.find(x => x.name.toLowerCase().includes("tickets") && x.type === "category")) {
        return message.channel.send(`:x: Cannot create a ticket since I cannot find my ticket category. \nPlease contact an admin to run **?setup**`)
    }

    if (message.guild.channels.find(x => x.name.includes(message.author.id.slice(14)))) {
        return message.channel.send("You already have a ticket open!" + "\nTicket ID: " + message.guild.channels.find(x => x.name.includes(message.author.id.slice(14))).id)
    }

    Config.findOne({
        guildID: message.guild.id
    }, (err, config) => {

        message.channel.send("Can you please describe the title of your issue? 20-100 characters only.").then(msg => {
            bot_array.push(msg)
            ticketsArray.push(message.author.id)
            collector.on("collect", m => {
                array_messages.push(m)


                if (m.content.toLowerCase().startsWith(config.prefix + "cancel")) {
                    array_messages.forEach(m => m.delete())
                    ticketsArray.splice(ticketsArray.findIndex(e => e === message.author.id), 1)
                    bot_array.forEach(m => m.delete())
                    message.channel.send("Successfully canceled the ticket!")

                    return collector.stop();
                }

                if (m.content.length < 20) {
                    return message.channel.send("Please describe your issue within the character length limit. (20-100 chars)" + " Current length: " + m.content.length).then(mm => {
                        bot_array.push(mm)
                    })
                } else

                if (m.content.length > 100) {
                    return message.channel.send("Please describe your issue within the character length limit. (20-100 chars)" + " Current length: " + m.content.length).then(md => {
                        bot_array.push(md)
                    })
                }

                infoEmbed.addField("Title", m.content)
                collector.stop();
                message.channel.send("Can you give a detailed description of your issue? 50-300 characters only.").then(mesg => {
                    bot_array.push(mesg)
                    kollector.on("collect", ms => {
                        array_messages.push(ms)

                        if (ms.content.toLowerCase().startsWith(config.prefix + "cancel")) {
                            array_messages.forEach(m => m.delete())
                            bot_array.forEach(m => m.delete())
                            ticketsArray.splice(ticketsArray.findIndex(e => e === message.author.id), 1)
                            message.channel.send("Successfully canceled the ticket!")
                            return kollector.stop();
                        }

                        if (ms.content.length < 50) {
                            return message.channel.send("Please describe your issue within the character length limit. (50-300 chars)" + " Current length: " + m.content.length).then(med => {
                                bot_array.push(med)
                            })
                        } else

                        if (ms.content.length > 300) {
                            return message.channel.send("Please describe your issue within the character length limit. (50-300 chars)" + " Current length: " + m.content.length).then(dem => {
                                bot_array.push(dem)
                            })
                        }

                        infoEmbed.addField("Description", ms.content)
                        message.guild.createChannel(message.author.id.slice(14) + " " + message.author.username, {
                            type: "text",
                            parent: message.guild.channels.find(x => x.name === "guardian-tickets").id,
                        }).then(chn => {
                            chn.send(infoEmbed)
                            kollector.stop();
                            chn.overwritePermissions(message.guild.id, {
                                "READ_MESSAGES": false,
                                "SEND_MESSAGES": false
                            })
                            chn.overwritePermissions(message.author.id, {
                                "SEND_MESSAGES": true,
                                "READ_MESSAGES": true
                            }).then(() => {
                                message.channel.send(`Successfully created the ticket!`).then(() => {
                                    array_messages.forEach(m => m.delete());
                                    bot_array.forEach(m => m.delete());
                                    ticketsArray.splice(ticketsArray.findIndex(e => e === message.author.id), 1)
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}

module.exports.help = {
    name: "ticket",
    dName: "ticket",
    desc: "Creates a ticket",
    usage: "?ticket",
    group: "other"
}