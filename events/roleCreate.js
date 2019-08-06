const Discord = require("discord.js");

module.exports.run = async (client, role) => {

    let logs = role.guild.channels.find(x => x.name.includes("guardian-logs"))

        if(!logs){
            return;
        }else{

            let embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("A role was made in " + role.guild.name)
            .addField("Role name", role.name, true)
            .addField("Role ID", role.id, true)
            .addField("Role Color(# / 0x)", role.hexColor, true)
            .addField("Role Position", role.position, true)
            .addField("Role Color(normal)", role.color, true)
            .setFooter("Guardian Moderation", client.user.displayAvatarURL)
            .setTimestamp()
    

            return logs.send(embed);
        }
}