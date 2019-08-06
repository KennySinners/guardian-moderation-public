const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

  this.member = message.mentions.members.first();

  let banEmbed = new Discord.MessageEmbed();

  message.delete(2000);

  if(!this.member){
    return message.channel.send("Error: Missing argument. \nArgument needed: **@user**");
  }else

  if(this.member.id === message.member.id){
    return message.channel.send(`Silly you! You can't ban yourself, dummy!`);
  }else

  if(!message.member.hasPermission("BAN_MEMBERS")){
    return message.channel.send("Insufficient Permission. \nPermission needed to run this command: **BAN_MEMBERS**");
  }else

  if(!message.guild.me.hasPermission("BAN_MEMBERS")){
    return message.channel.send("Client Error: Insufficient Permission. \nPermission needed: **BAN_MEMBERS**");
  }else

  if(this.member.roles.highest.position >= message.member.roles.highest.position){
    return message.channel.send("You cannot ban someone that has the same or higher role than you.");
  }else

  if(this.member.roles.highest.position >= message.guild.me.roles.highest.position){
    return message.channel.send("Client Error: Cannot ban someone that has the same or higher role than " + message.guild.me.displayName);
  }

  if(!message.content.split(" ").slice(2).join(" ")){
    banEmbed.addField("Reason", "No supplied reason");
  }else{
    banEmbed.addField("Reason", message.content.split(" ").slice(2).join(" "));
  }

  if(message.member.hasPermission("BAN_MEMBERS") && message.guild.me.hasPermission("BAN_MEMBERS") && this.member){

    banEmbed.setColor(message.member.roles.highest.hexColor);
    banEmbed.addField("Member who was banned", this.member.displayName);
    banEmbed.addField("Member who banned " + this.member.displayName, message.member.displayName);
    banEmbed.addField("Server the member was banned from", message.guild.name);
    banEmbed.setFooter("Guardian Moderation", client.user.displayAvatarURL);
    banEmbed.setTimestamp();

    let logChannel = message.guild.channels.find(c => c.name.includes("log"));
    let logCategory = message.guild.channels.find(c => c.name.toLowerCase());

    this.member.ban().then(() => {
      if(logChannel){
        logChannel.send(banEmbed);
      }else{
        message.guild.createChannel("guardian-logs" , {
          type: "text",
          permissions: [{
            id: message.guild.id,
            deny: ["SEND_MESSAGES", "READ_MESSAGES"],
          }]
        }).then(chn => {
          chn.send(banEmbed);
        });
      }
      message.channel.send(`Successfully banned ${this.member.displayName} | Tag: ${this.member.user.tag}`);
    });
  }

};

module.exports.help = {
  "name": "ban",
  "dName": "ban",
  "desc": "Bans the mentioned user",
  "usage": "?ban @user [supplied_reason]",
  "group": "admin"
};
