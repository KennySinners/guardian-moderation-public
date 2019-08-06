const Discord = require("discord.js");
const oldMap = new Map()
const { Permissions } = require ('discord.js')
module.exports.run = async (client, oldChn, newChn) => {

    let logs = newChn.guild.channels.find(x => x.name.includes("guardian-logs"))
    let array = [];

    if (!logs) {
        return;
    } else {

        let embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("A channel was updated in " + oldChn.guild.name)
            .setFooter("Guardian Moderation", client.user.displayAvatarURL)
            .setTimestamp()


        if (oldChn.name !== newChn.name) {
            embed.addField("New channel name", "**" + oldChn.name + "**" + " to " + "**" + newChn.name + "**")
            return logs.send(embed);
        }

        if (oldChn.parentID !== newChn.parentID) {
            embed.addField("Channel was moved to a new category", "**" + oldChn.parent.name + "**" + " to " + "**" + newChn.parent.name + "**")
            return logs.send(embed);
        }
    }
}