const Discord = require("discord.js");
const mongoose = require("mongoose");
const Inventory = require("../../lib/inventory");

module.exports.run = async (client, message, args) => {

    // const mUser = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;

    let invent = {
        "rifle": "Rifle",
        "pistol": "Pistol",
        "knife": "Knife",
        "crossbow": "Crossbow"
    };

    Inventory.findOne({
        userID: message.member.id,
        guildID: message.guild.id
    }, (err, inv) => {
        if (err) return console.log(err);

        let invEmbed = new Discord.MessageEmbedbed()
            .setColor("RANDOM")
            .setTitle(message.member.displayName + "'s inventory")
            .setFooter("Guardian Moderation", client.user.displayAvatarURL)
            .setTimestamp();

        if (!inv) {
            let newInv = new Inventory({
                userID: message.member.id,
                guildID: message.guild.id,
                inventory: []
            });
            newInv.save().catch(ex => console.log(ex));
            return message.channel.send("You weren't in my database, so I added you!");
        } else if (inv.inventory.length <= 0) {
            invEmbed.addField("Inventory", "No items!");
            return message.channel.send(invEmbed);
        }else {
            invEmbed.addField("Inventory", inv.inventory);
            return message.channel.send(invEmbed);
        }

    });
};

module.exports.help = {
    "name": "inventory",
    "dName": "inventory",
    "desc": "Displays the mentioned user's inventory",
    "usage": "?inventory @user/[user_id] / ?inventory",
    "group": "eco"
};