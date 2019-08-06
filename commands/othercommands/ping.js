const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    let m = await message.channel.send("Ping?")

    let pingEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Pong!")
        .addField("**Websocket Latency**", Math.round(client.ping) + " ms")
        .addField("**Command Latency**", m.createdTimestamp - message.createdTimestamp + " ms")

    m.edit(pingEmbed)

    message.delete();

}

module.exports.help = {
    "name": "ping",
    "dName": "ping",
    "desc": "Shows the latency between the bot and the discord's websocket and your latency between discord's websocket",
    "usage": "?ping",
    "group": "other"
}
