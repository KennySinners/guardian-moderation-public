const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const mUser = message.mentions.users.first() || client.users.get(args[0]) || message.author;

    let status = {
        "dnd": "Do not Disturb",
        "idle": "Idle",
        "offline": "Offline",
        "online": "Online"
    }

    let games = {
        "0": "Playing",
        "1": "Streaming",
        "2": "Listening to",
        "3": "Watching"
    }

	const userEmbed = new Discord.MessageEmbed()
	.setColor("RANDOM")
	.setAuthor(mUser.tag, mUser.displayAvatarURL)
	.addField("Name", mUser.username, true)
	.addField(`Nickname in ${message.guild.name}`, `${message.guild.member(mUser).nickname ? message.guild.member(mUser).nickname : "This user doesn't have a nickname."}`, true)
	.addField("User Join Date", message.guild.member(mUser).joinedAt)
	.addField("Account Creation Date", mUser.createdAt)
	.addField("User Tag", `#${mUser.discriminator}`, true)
    .addField("ID", mUser.id, true)
    .addField("Nitro", mUser.premium ? "This user has Nitro" : "This user doesn't have Nitro", true)
    .addField("Bot", mUser.bot ? "This user is a bot" : "This user is not a bot", true)
    .addField("Status", status[mUser.presence.status], true)
    .addField("Presence", mUser.presence.game ? `**${games[mUser.presence.game.type]}**` + " " + mUser.presence.game.name : "This user isn't playing a game", true)
    .addField("Spotify", mUser.presence.game ? mUser.presence.game.name.toLowerCase() === "spotify" ? "**Song**: " + mUser.presence.game.details + "\n**Artist(s)**: " + mUser.presence.game.state.replace(/;/g, ', ') + "\n**Album**: " + mUser.presence.game.assets.largeText : "This user isn't listening to spotify or the bot cannot recognize it since the mentioned user has another presence." : "This user is not using any presence", true)
    .setThumbnail(mUser.presence.game ? mUser.presence.game.name.toLowerCase() === "spotify" ? `https://i.scdn.co/image/${mUser.presence.game.assets.largeImage.replace('spotify:', '')}` : mUser.displayAvatarURL : mUser.displayAvatarURL)
	.setFooter("Guardian Moderation", client.user.displayAvatarURL)
	.setTimestamp()

     message.channel.send(userEmbed)
     

     message.delete(2000);
}

module.exports.help = {
    name: "userinfo",
    dName: "userinfo",
    desc: "Displays information about the user",
    usage: "?userinfo @user",
    group: "util"
}
