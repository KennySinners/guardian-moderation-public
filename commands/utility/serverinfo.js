const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  
  message.delete();

    let regions = {
        "eu-central": ":flag_eu: Europe Central",
        "eu-west": ":flag_eu: Europe West",
        "us-central": ":flag_us: US Central",
        "us-west": ":flag_us: US West",
        "us-south": ":flag_us: US South",
        "us-east": ":flag_us: US East",
        "brazil": ":flag_br: Brazil",
        "japan": ":flag_jp: Japan",
        "hong-kong": ":flag_hk: Hong Kong",
        "india": ":flag_in: India",
        "south-africa": ":flag_af: South Africa",
        "singapore": ":flag_sg: Singapore",
        "russia": ":flag_ru: Russia",
        "sydney": ":flag_au: Sydney"
    }

    let serverinfo = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Information about ${message.guild.name}`, message.guild.iconURL)
    .addField("Server Creation Date", message.guild.createdAt, true)
    .addField("Member Count:", message.guild.memberCount + " members", true)
    .addField("Bots", message.guild.members.filter(x => x.user.bot).size, true)
    .addField("Users", message.guild.members.filter(x => !x.user.bot).size, true)
    .addField("Server Region", regions[message.guild.region], true)
    .addField("Server Owner", message.guild.owner.user.tag, true)

    message.channel.send(serverinfo)

}

module.exports.help = {
  "name": "serverinfo",
  "dName": "serverinfo",
  "desc": "Shows information about the server",
  "usage": "?serverinfo",
  "group": "util"
}
