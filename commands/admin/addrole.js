const Discord = require("discord.js");
const mongoose = require("mongoose");

module.exports.run = async (client, message, args) => {

    let mUser = message.mentions.members.first() || message.guild.members.get(args[0]);
    let foundRole = message.mentions.roles.first() || message.guild.roles.find(x => x.name.toLowerCase() === message.content.split(" ").slice(2).join(" ") || x.name.toLowerCase().includes(message.content.split(" ").slice(2).join(" ")));
    const collector = message.channel.createMessageCollector(m => m.author.id === message.member.id);

    if(!message.member.hasPermission("MANAGE_ROLES")) {
        return message.channel.send("Sorry, " + message.member.displayName + ", but you cannot use this command!");
    }

    if(!message.guild.me.hasPermission("MANAGE_ROLES")) {
        return message.channel.send("Client Error: Insufficient Permission. Please grant the client the following permission: MANAGE_ROLES");
    }

    if(!mUser) {
        return message.channel.send("Sorry, but you have to mention a member in order to run this command.");
    }

    if(foundRole.id) {
        return message.channel.send("Sorry, " + message.member.displayName + ", but I couldn't find that role in the guild.");
    }

    if(foundRole.name.includes("everyone")) {
        return message.channel.send("Please supply a role name or a mention.");
    }

    if(mUser && message.guild.members.get(mUser.id) && message.guild.roles.get(foundRole.id)){

        message.channel.send(`The role you wanted to add was ${foundRole.name}, right? If so, answer with 'yes' to add the role, and if not, answer with 'no' to return this command.`).then(() => {
            collector.on("collect", c => {
                if(c.content.toLowerCase().includes("no")){
                    return message.channel.send("Sorry for the inconvenience!").then(() => {
                        collector.stop();
                    });
                } else if(c.content.toLowerCase().includes("yes")){
                    return mUser.addRole(foundRole.id).then(() => {
                        message.channel.send(`Added ${foundRole.name} to ${mUser.displayName}!`);
                    });
                }
            });
        });
    }
};

module.exports.help = {
    "name": "addrole",
    "dName": "addrole",
    "desc": "Adds a specified role to the mentioned user",
    "usage": "?addrole @user [role_name]/[@role]",
    "group": "admin"
};
