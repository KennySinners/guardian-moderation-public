const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const muteR = message.guild.roles.find(c => c.name.toLowerCase() === "muted")

    let role = message.guild.roles.find(x => x.name.toLowerCase().includes("member"))

    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(`Insufficient Permission`)

    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send(`The client does not have permission to do this. \nPlease contact the owner of the server to grant me permission. \nPermission needed: 'MANAGE_ROLES'`)

    if (!message.mentions.members.first()) return message.channel.send(`Member was not found inside of the guild or was not mentioned.`)

    if (message.mentions.members.first().roles.has(muteR)) return message.channel.send(`The mentioned member is not muted.`)

    if (message.member.hasPermission("MANAGE_ROLES")) {
      message.mentions.members.first().roles.remove(muteR)
      role ? message.mentions.members.first().roles.add(role.id) : console.log("Didn't find a role called 'member'")
      message.channel.send(`Successfully unmuted **${message.mentions.members.first().displayName}**`)
    }

}

module.exports.help = {
    name: "unmute",
    dName: 'unmute',
    desc: "Unmutes the targeted user if they are muted",
    usage: "?unmute @user",
    group: "mod"
}