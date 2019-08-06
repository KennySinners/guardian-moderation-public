const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const logChannel = message.guild.channels.find(x => x.name === 'guardian-logs')

    let role = message.guild.roles.find(x => x.name.toLowerCase().includes("member"))

    const muteR = message.guild.roles.find(c => c.name.toLowerCase() === "muted")
    if (!muteR) {
      message.guild.createRole({
        "name": "muted"
      }).then(role => {
        message.guild.channels.forEach(channel => {
          channel.overwritePermissions(role, {
            "SEND_MESSAGES": false,
            "READ_MESSAGES": false
          });
        })
        message.channel.send(`Successfully muted ${message.mentions.members.first().displayName}`)
        message.mentions.members.first().roles.add(role.id)
        role ? message.mentions.members.first().roles.remove(role.id) : console.log("Didn't find a member role");
        message.member.send("There was no role called 'muted'. So I created one.");
      });
    }else{
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You do not have the authorization to do this.")

    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send(`The client does not have permission to do this. \nPlease contact the owner of the server to grant me permission. \nPermission needed: 'MANAGE_ROLES'`)

    if (message.member.highestRole.position < muteR.position) return message.channel.send("You cannot add a role that's above your highest role!")

    if (message.guild.me.highestRole.position < muteR.position) return message.channel.send("Client error: cannot add a role that's higher than my role.")

    if (!message.mentions.members.first()) return message.channel.send("The mentioned member was not found.")

    if (message.mentions.members.first().roles.has(muteR.id)) return message.channel.send("This user is already muted.")

    if (message.member.hasPermission("MANAGE_ROLES") && message.guild.me.hasPermission("MANAGE_ROLES")) {
      message.mentions.members.first().roles.add(muteR.id)
      role ? message.mentions.members.first().roles.remove(role.id) : console.log("Didn't find a member role");
      message.channel.send(`Successfully muted **${message.mentions.members.first().displayName}**`);
     }
     
    }
}

module.exports.help = {
    name: "mute",
    dName: "mute",
    desc: "Mutes the mentioned member",
    usage: "?mute @user",
    group: "mod"
}