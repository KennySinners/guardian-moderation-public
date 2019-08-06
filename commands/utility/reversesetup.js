const Discord = require("discord.js");
const { tickets } = require("../othercommands/ticket");

module.exports.run = async (client, message, args) => {

    message.delete();

    let channel_array = [];

    if (!message.member.hasPermission("ADMINISTRATOR")) {
        return message.channel.send(":x: Error: Insufficient Permission. \nPlease contact an administrator to run this command.")
    }

    let loadingEmbed = new Discord.MessageEmbed()
        .setColor("0x36393E")
        .setTitle("⏱ | Reverse setting up Guardian Moderation....")
        .setDescription("This shouldn't take long")
        .setThumbnail("https://cdn.discordapp.com/attachments/594288389465833483/595634616531156992/loading.gif")
        .setFooter("Support Server: ", client.user.displayAvatarURL)
        .setTimestamp()

    let successEmbed = new Discord.MessageEmbed()
        .setColor("0x36393E")
        .setTitle("✅ | Reverse Setup was successful")
        .setDescription("I have reversed every change I made with **?setup** \nThank you for adding me into your server! :)")
        .setFooter("Guardian Moderation", client.user.displayAvatarURL)
        .setTimestamp()

    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) {
        return message.channel.send(`❌ Error: Could not begin reverse setup because I am missing permission to do this. \nPermissions needed: MANAGE_CHANNELS, MANAGE_ROLES, MANAGE_MESSAGES`)
    } else
        if (!message.guild.channels.find(x => x.name.includes("guardian-logs"))) {
            return message.channel.send(`:x: Error: I have already ran reverse setup on this server!`)
        } else

            if (!message.guild.roles.find(x => x.name.toLowerCase() === "guardian moderation")) {
                return message.channel.send(`:x: Error: I have already ran reverse setup on this server!`)
            }

    if (message.guild.me.hasPermission("MANAGE_CHANNELS") && message.guild.channels.find(x => x.name.includes("guardian-logs"))) {
        message.channel.send(loadingEmbed)
        message.guild.channels.find(x => x.name.toLowerCase() === "guardian-category").delete().then(() => {
            message.guild.channels.find(x => x.name === "guardian-logs").delete().then(() => {
                message.guild.roles.find(x => x.name.toLowerCase() === "guardian mod").delete().then(() => {
                    message.guild.channels.forEach(chn => {
                        if (chn.parentID === message.guild.channels.find(x => x.name.toLowerCase().includes("tickets")).id) {
                            chn.delete()
                        } else {
                            return;
                        }
                    })
                    message.channel.send(successEmbed).then(() => {
                        message.guild.channels.find(x => x.name.toLowerCase().includes("tickets")).delete();
                    })
                })
            })
        })
    }

}

module.exports.help = {
    "name": "resetup",
    "dName": "resetup",
    "desc": "Reverses the setup of the bot that was made to the guild.",
    "usage": "?resetup",
    "group": "util"
}
