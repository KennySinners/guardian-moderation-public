const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

  let ecoHelp = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .addField("💸 Economy 💸", eco)
    .setFooter("Guardian Moderation", client.user.displayAvatarURL)
    .setTimestamp()

  let modHelp = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .addField("🛡 Moderation 🛡", mod)
    .setFooter("Guardian Moderation", client.user.displayAvatarURL)
    .setTimestamp()

  let adminHelp = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .addField("🛠 Administrator 🛠", admin)
    .setFooter("Guardian Moderation", client.user.displayAvatarURL)
    .setTimestamp()

  let utilHelp = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .addField("⚙ Utility ⚙", util)
    .setFooter("Guardian Moderation", client.user.displayAvatarURL)
    .setTimestamp()

  let funHelp = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .addField("🤡 Fun 🤡", fun)
    .setFooter("Guardian Moderation", client.user.displayAvatarURL)
    .setTimestamp()

  let otherHelp = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .addField("🔗 Other 🔗", other)
    .setFooter("Guardian Moderation", client.user.displayAvatarURL)
    .setTimestamp()


  let helpEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("The help embed on it's own is too long currently, sorry!")
    .addField("I apologize for the inconvenience, but... ", "the embed has begun to exceed the 1024 characters limit.. \nIf you want to see all the commands, you can do `?help category` for a list of commands for that category")
    .addField("Available Categories", "- Admin \n**[Variations: 'Administrator', 'Administration']**\n\n- Mod \n**[Variations: 'Moderator', 'Moderation']**\n\n- Economy \n**[Variations: 'Eco']**\n\n- Fun \n**[Variations: 'Funny']**\n\n- Other \n\n- Utility \n**[Variations: 'Util', 'Utilities']**\n")
    .setFooter("Apple - Developer of Guardian Moderation", client.users.get("163065204597325824").avatarURL)
    .setTimestamp()

  let ec2 = ['eco', 'economy', 'Eco', 'Economy']
  let admin2 = ['admin', 'administrator', 'administration', 'Admin', 'Administrator', 'Administration']
  let mod2 = ['mod', 'moderation', 'moderator', 'Mod', 'Moderation', 'Moderator']
  let fun2 = ['fun', 'funny', 'Fun', 'Funny']
  let dev2 = ['dev', 'developer', 'Dev', 'Developer']
  let other2 = ['other', 'Other']
  let util2 = ['util', 'utilities', 'utility', 'Util', 'Utilities', 'Utility']

  const cmdFind = client.commands.find(x => x.help.name.toLowerCase() === args[0])

  const dsntInclude = !ec2.includes(args[0]) || !admin2.includes(args[0]) || !mod2.includes(args[0]) || !fun2.includes(args[0]) || !other2.includes(args[0]) || !util2.includes(args[0]);
  const dsInclude = ec2.includes(args[0]) || admin2.includes(args[0]) || mod2.includes(args[0]) || fun2.includes(args[0]) || other2.includes(args[0]) || util2.includes(args[0]);

  console.log(cmdFind);

  if (args[0] && dsInclude) {

    if (ec2.includes(args[0])) {
      return message.channel.send(ecoHelp)
    } else
    if (admin2.includes(args[0])) {
      return message.channel.send(adminHelp)
    } else
    if (fun2.includes(args[0])) {
      return message.channel.send(funHelp)
    } else
    if (dev2.includes(args[0])) {
      return message.channel.send(devHelp)
    } else
    if (other2.includes(args[0])) {
      return message.channel.send(otherHelp)
    } else
    if (util2.includes(args[0])) {
      return message.channel.send(utilHelp)
    } else
    if (mod2.includes(args[0])) {
      return message.channel.send(modHelp)

    }

  } else

  if (args[0] && dsntInclude) {
    if (cmdFind) {
      message.channel.send(`\`\`\`${cmdFind.help.desc} \n\n\n${cmdFind.help.usage} \n\n\nIf you need to see all the commands, you can do '?help' and it'll display all categories.\`\`\` `)
    } else {
      return message.channel.send("That is not a valid command.")
    }
  } else {
    return message.channel.send(helpEmbed);
  }
}

module.exports.help = {
  "name": "help",
  "dName": "help",
  "desc": "Displays the help embed",
  "usage": "?help",
  "group": "other"
}