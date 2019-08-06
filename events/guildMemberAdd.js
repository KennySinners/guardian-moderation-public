const Discord = require("discord.js");

module.exports.run = async (client, member) => {

    if (member.guild.id === "578609352663891978") {

        const main_embed = new Discord.MessageEmbed()
            .setColor("#B19CD9")
            .setAuthor("Welcome to Occult!", member.user.avatarURL)
            .setImage(`https://cdn.discordapp.com/attachments/588723295461834752/599662352484270092/image0.jpg`)
            .setTimestamp()

        const rules_1 = new Discord.MessageEmbed()
            .setColor("#B19CD9")
            .setAuthor("Rules of " + member.guild.name, member.guild.iconURL)
            .setTitle("°lI|l°°lI|l°l|Il°l|°l|Il|I°l|I|l|I°I|l|Il°|l°°l|Il°l|Il°°lI|l° ")
            .addField("1.", "**No spamming in ANY chat channels.**")
            .addField("2.", "**Strictly no NSFW.**")
            .addField("3.", "**No advertising.**")
            .addField("4.", "**Only have conversations in** <#578646459801403402>")
            .addField("5.", "No BULLYING.")
            .addField("6.", "No spamming bot commands outside bot channels.")
            .addField("7.", "If possible try to include new members into the community into your conversations or start one.")
            .addField("8.", "Do NOT ask to be a mod.")
            .addField("9.", "If you leave the server, don’t expect your roles to be given back.")
            .addField("10.", "Don’t be racist, though “nigger” is allowed as a joke.")
            .addField("11.", "No posting pictures, or info of somebody without given permission.")
            .addField("12.", "Absolutely no violating Discord TOS (Terms of Service.)")
            .addField("13.", "No earrape unless given permission.")
            .addField("14.", "No harassing.")
            .addField("15.", "Again NO advertising.")
            .addField("16.", "Use music commands in music channels only.")
            .setFooter("°lI|l°°lI|l°l|Il°l|°l|Il|I°l|I|l|I°I|l|Il°|l°°l|Il°l|Il°°lI|l°")

            member.send(main_embed).then(() => {
                member.send(rules_1).then(() => {
                    member.send("Please keep in mind that if you leave the server within the next 5 hours you will be automatically banned.")
                })
            })
    }

}