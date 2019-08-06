const Discord = require("discord.js");
const fs = require("fs");
const {
  config,
  ticketsArray
} = require("../Config.json")
const Config = require("../lib/mongodb");
const Money = require("../lib/money.js");
const Xp = require("../lib/xp.js");
const Channel = require("../lib/ignored_channels");
const Guild = require("../lib/ignored_guilds");
const Daily = require("../lib/dailyUsers");
const Levels = require("../lib/level.js");
let cooldown = new Set();
let cdseconds = 3;

let timer = new Set()

module.exports.run = async (client, message) => {
  
  if (message.mentions.everyone) return;
  if (message.author.bot) return;

  Config.findOne({
    guildID: message.guild.id,
  }, (err, guild) => {
    if (err) return console.error(err);

    let Prefix;

    if (!guild.prefix) {
      Prefix = "?"
    } else {
      Prefix = guild.prefix;
    }

    if (message.guild.name.toLowerCase().includes("occult")) {
      if (message.content.toLowerCase().includes("hoes mad")) {
        message.react("a:wilin:595013204841857055")
      }

      if (message.content.toLowerCase().includes("flex seal")) {
        message.react("a:secsi:595013191189135410")
      }
    }

    if (message.content.toLowerCase().includes("https://discord.gg") || message.content.toLowerCase().includes("http://invite.gg") || message.content.toLowerCase().includes("https://invite.gg")) {
      if (message.channel.name.includes("partner")) {
        return;
      } else {
        message.delete();
      }
    }

    let coins_to_add = Math.ceil(Math.random() * 50);
    console.log("Added " + coins_to_add + "cash to " + message.author.tag + "\n");
    Money.findOne({
      userID: message.author.id,
      guildID: message.guild.id
    }, (err, money) => {
      if (err) return console.error(err);

      if (message.content.split(" ").slice(1).length < 1) return;

      if (message.author.id === "366010111161925632") return;

      if (!money) {
        const newMoney = new Money({
          userID: message.author.id,
          guildID: message.guild.id,
          money: coins_to_add
        });

        return newMoney.save().catch(err => console.log(err));
      } else {
        money.money = money.money + coins_to_add;
        return money.save().catch(err => console.log(err));
      }
    });

    let xp_to_add = Math.ceil(Math.random() * 50);
    console.log("Added " + xp_to_add + "xp to " + message.author.tag + "\n");
    Xp.findOne({
      userID: message.author.id,
      guildID: message.guild.id
    }, (err, xp) => {
      if (err) return console.log(err);

      if (!xp) {
        const newXp = new Xp({
          userID: message.author.id,
          guildID: message.guild.id,
          xp: xp_to_add
        });
        return newXp.save().catch(err => console.log(err));
      }

      Levels.findOne({

      }, (err, level) => {
        if (err) return console.log(err);

        if (!level) {

          const newLvl = new Levels({
            guildID: message.guild.id,
            userID: message.member.id,
            level: 1
          });
          return newLvl.save().catch(ex => console.log(ex));
        }

        if (xp) {
          xp.xp = xp.xp + xp_to_add;
          return xp.save().catch(err => console.log(err));
        }

        let nxtLvl = level.level * 100;

        if (xp.xp >= nxtLvl) {

          level.level += 1;
          message.channel.send(`Level up! ${message.member.displayName} is Level ${level.level} now!`);
          return level.save().catch(ex => console.log(ex));
        }

      });
    });

    if (message.embeds.some(embed => embed.type === "rich") && !message.author.bot) {
      message.member.send("You were banned from " + message.guild.name + " because of selfbotting.").then(() => {
        message.member.ban("Selfbotting");
      })
    }

    if (!message.content.startsWith(Prefix)) return;

    if (ticketsArray.includes(message.author.id) && message.content.startsWith(Prefix + "ticket")) {
      return message.channel.send("You are already creating a ticket!")
    }

    if (cooldown.has(message.member.id)) {
      message.delete();
      message.reply("Please wait 3 seconds before using a command again!");
    }

    if (!message.member.hasPermission("ADMINISTRATOR")) {
      cooldown.add(message.member.id);
    }

    let command = message.content.split(" ")[0].toLowerCase();
    let args = message.content.split(" ").slice(1);

    let commandfile = client.commands.get(message.content.toLowerCase().split(" ")[0].slice(Prefix.length));

    if (commandfile) {
      commandfile.run(client, message, args);
    }

    setTimeout(function () {
      cooldown.delete(message.member.id);
    }, cdseconds * 1000);

  });
};