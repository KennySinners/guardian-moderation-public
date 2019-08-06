const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    function clean(text) {
        if (typeof(text) === "string")
          return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
      }

    try {
        const code = args.join(" ");
        let evaled = eval(code);
   
        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);

        await message.channel.send(message.content.split(" ").slice(1).join(" "), { code: "js" })
        await message.channel.send(`📤 
\`\`\`xl
${clean(evaled)}
\`\`\` `)
      } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
      }

}

module.exports.help = {
    "name": "eval",
    "dName": "eval",
    "desc": "Evaluates code",
    "usage": "?eval [code]",
    "group": "dev"
}