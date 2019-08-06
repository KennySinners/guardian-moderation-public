const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

  this.member = message.mentions.members.first();

  message.delete(2000);

  if (!this.member) {
    return message.channel.send("Error: Missing argument. \nArgument needed: **@user**");
  } else

  if (this.member.id === message.member.id) {
    return message.channel.send(`Silly you! You can't kick yourself, dummy!`);
  } else

  if (!message.member.hasPermission("KICK_MEMBERS")) {
    return message.channel.send("Insufficient Permission. \nPermission needed to run this command: **kick_MEMBERS**");
  } else

  if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
    return message.channel.send("Client Error: Insufficient Permission. \nPermission needed: **kick_MEMBERS**");
  } else

  if (this.member.roles.highest.position >= message.member.roles.highest.position) {
    return message.channel.send("You cannot kick someone that has the same or higher role than you.");
  } else

  if (this.member.roles.highest.position >= message.guild.me.roles.highest.position) {
    return message.channel.send("Client Error: Cannot kick someone that has the same or higher role than " + message.guild.me.displayName);
  }

  if (!message.content.split(" ").slice(2).join(" ")) {
    kickEmbed.addField("Reason", "No supplied reason");
  } else {
    kickEmbed.addField("Reason", message.content.split(" ").slice(2).join(" "));
  }

  if (message.member.hasPermission("KICK_MEMBERS") && message.guild.me.hasPermission("KICK_MEMBERS") && this.member) {
    let logChannel = message.guild.channels.find(c => c.name.includes("log"));
    let logCategory = message.guild.channels.find(c => c.name.toLowerCase());

    kickEmbed.setColor(message.member.roles.highest.position);
    kickEmbed.addField("Member who was kicked", this.member.displayName);
    kickEmbed.addField("Member who kicked " + this.member.displayName, message.member.displayName);
    kickEmbed.addField("Server the member was kicked from", message.guild.name);
    kickEmbed.setFooter("Guardian Moderation", client.user.displayAvatarURL);
    kickEmbed.setTimestamp();

    this.member.kick().then(() => {
      if (logChannel) {
        logChannel.send(kickEmbed);
      } else {
        message.guild.createChannel("guardian-logs", {
          type: "text",
          permissions: [{
            id: message.guild.id,
            deny: ["SEND_MESSAGES", "READ_MESSAGES"],
          }]
        }).then(chn => {
          chn.send(kickEmbed);
        });
      }
      message.channel.send(`Successfully kicked ${this.member.displayName} | Tag: ${this.member.user.tag}`);
    });
  }

};

module.exports.help = {
  "name": "kick",
  "dName": "kick",
  "desc": "Kicks the mentioned user",
  "usage": "?kick @user [supplied_reason]",
  "group": "admin"
};