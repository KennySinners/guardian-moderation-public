const Discord = require("discord.js");

module.exports.run = async (client, message, msg) => {

    let logs = message.guild.channels.find(x => x.name.includes("guardian-logs"))

    if(!logs){
        return;
    } else{ 

        let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("A message was edited in " + message.guild.name)
        .setFooter("Guardian Moderation", client.user.displayAvatarURL)
        .setTimestamp()
        

        if(msg.content.length <= 0 || msg.author.bot || msg.content === message.content){
            return;
        }else
    
        if(!msg.content.length <= 0){
            embed.setAuthor("Author of the message: " + message.author.tag, message.author.displayAvatarURL)
            embed.addField("Message that was edited", `Old content: ${message.content} \nNew content: ${msg.content}`)
        }

        return logs.send(embed)
    }
}
