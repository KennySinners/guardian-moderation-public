const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

  message.delete();

  if (!message.member.hasPermission("ADMINISTRATOR")) {
    return message.channel.send(":x: Error: Insufficient Permission. \nPlease contact an administrator to run this command.")
  }

  let loadingEmbed = new Discord.MessageEmbed()
    .setColor("0x36393E")
    .setTitle("⏱ | Setting up Guardian Moderation....")
    .setDescription("This shouldn't take long")
    .setThumbnail("https://cdn.discordapp.com/attachments/594288389465833483/595634616531156992/loading.gif")
    .setFooter("Support Server: ", client.user.displayAvatarURL)
    .setTimestamp()

  let successEmbed = new Discord.MessageEmbed()
    .setColor("0x36393E")
    .setTitle("✅ | Setup was successful")
    .setDescription("I have set up everything for myself. \nThank you for adding me into your server! :)")
    .setFooter("Guardian Moderation", client.user.displayAvatarURL)
    .setTimestamp()

  if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) {
    return message.channel.send(`❌ Error: Could not begin setup because I am missing permission to do this. \nPermissions needed: MANAGE_CHANNELS, MANAGE_ROLES, MANAGE_MESSAGES`)
  } else
    if (message.guild.channels.find(x => x.name.includes("guardian-logs"))) {
      return message.channel.send(`:x: Error: I have already ran setup on this server!`)
    } else

      if (message.guild.roles.find(x => x.name.toLowerCase() === "guardian moderation" && x.hexColor === "#00f5ff")) {
        return message.channel.send(`:x: Error: I have already ran setup on this server!`)
      }

  if (message.guild.me.hasPermission("MANAGE_CHANNELS") && !message.guild.channels.find(x => x.name.includes("guardian-logs"))) {
    message.channel.send(loadingEmbed).then(msg => {
    message.guild.createChannel('guardian-category', {
      type: "category",
      permissions: [{
        id: message.guild.id,
        deny: ["READ_MESSAGES", "SEND_MESSAGES"],
        allow: []
      }]
    }).then(cat => {
      message.guild.createRole({
        name: "Guardian Mod",
        color: "#00fff6",
        permissions: ["SEND_MESSAGES", "READ_MESSAGES", "ADMINISTRATOR"]
      }).then(role => {
        message.guild.me.roles.add(role.id)
        message.guild.createChannel("guardian-logs", {
          type: "text",
          parent: cat.id,
          permissions: [{
            id: message.guild.id,
            deny: ["READ_MESSAGES", "SEND_MESSAGES"],
            allow: []
          }]
        })
      }).then(chn => {
        !message.guild.channels.find(x => x.name.toLowerCase() === "guardian-tickets") ? message.guild.createChannel("guardian-tickets", {
          type: "category",
          permissions: [{
            id: message.guild.id,
            deny: ["READ_MESSAGES", "SEND_MESSAGES"],
            allow: []
          }]
        }) : console.log("Already have this category!")
        msg.edit(successEmbed)
      })
    })
  })
  }

}

module.exports.help = {
  "name": "setup",
  "dName": "setup",
  "desc": "Sets up the bot's settings into your guild.",
  "usage": "?setup",
  "group": "util"
}
