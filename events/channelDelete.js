const Discord = require("discord.js");

module.exports.run = async (client, channel) => {

    let logs = channel.guild.channels.find(x => x.name.includes("guardian-logs"))

    if(!logs){
        return;
    }else{

        let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("A channel was deleted in " + channel.guild.name)
        .addField("Channel name", channel.name, true)
        .addField("Channel ID", channel.id, true)
        .addField("Channel Parent (category)", channel.parent.name, true)
        .setFooter("Guardian Moderation", client.user.displayAvatarURL)
        .setTimestamp()

        return logs.send(embed);
    }

}