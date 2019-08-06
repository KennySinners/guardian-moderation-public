const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    let mUser = message.mentions.users.first() || client.users.get(args[0]) || message.author;

    let avatarEmbed = new Discord.MessageEmbed()
        .setColor(message.guild.member(mUser).highestRole.hexColor)
        .setTitle("Guardian Moderation Avatar Showcase")
        .setAuthor(mUser.tag, mUser.displayAvatarURL)
        .setImage(mUser.displayAvatarURL)
        .setFooter("Guardian Moderation", client.user.displayAvatarURL)
        .setTimestamp();

    message.channel.send(avatarEmbed);

    message.delete(2000);

};

module.exports.help = {
    "name": "avatar",
    "dName": "avatar",
    "desc": "Showcases the mentioned user's avatar in an embed.",
    "usage": "?avatar @user",
    "group": "fun"
};
