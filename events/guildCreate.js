const Discord = require("discord.js");

module.exports.run = async (client, guild) => {

    let dev = client.users.get("575108662457139201")

    let embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("Thank you for adding Guardian Moderation to " + guild.name)
    .setAuthor(client.user.tag, client.user.displayAvatarURL)
    .setDescription("My default prefix is **`?`**, but you can change that with the `?prefix` command. \nIf you have any issues/questions with/about Guardian Moderation, please contact my owner: \n**" + dev.tag + "**")
    .setTimestamp()

    guild.owner.send(embed)

}