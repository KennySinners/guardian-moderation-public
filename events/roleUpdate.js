const Discord = require("discord.js");

module.exports.run = async (client, oldRole, newRole) => {

    let logs = newRole.guild.channels.find(x => x.name.includes("guardian-logs"))

    if (!logs) {
        return;
    } else {

        let embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("A role was updated in " + oldRole.guild.name)
            .setFooter("Guardian Moderation", client.user.displayAvatarURL)
            .setTimestamp()

        if (oldRole.name === newRole.name) {
            return;
        } else {
            embed.addField("New role name", `Old name: **${oldRole.name}** \nNew name: **${newRole.name}**`, true)
            console.log("New role name " + newRole.name)
        }

        if (oldRole.hexColor === newRole.hexColor) {
            return;
        } else {
            embed.addField("New role hexColor", `From **${oldRole.hexColor}** to **${newRole.hexColor}**`, true)
            console.log("New role hexColor " + newRole.hexColor)
        }

        if (oldRole.position !== newRole.position) {
            embed.addField("New role position", `Old position: ${oldRole.position} \nNew position: ${newRole.position}`, true)
            console.log("New role position: " + newRole.position)
        }

        return logs.send(embed);
    }
}