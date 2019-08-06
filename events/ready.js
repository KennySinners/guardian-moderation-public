const Discord = require("discord.js");
const Config = require("../lib/mongodb");
const mongoose = require("mongoose");
mongoose.connect(`mongodb://kenny:csszom12@cluster0-shard-00-00-b0icz.mongodb.net:27017,cluster0-shard-00-01-b0icz.mongodb.net:27017,cluster0-shard-00-02-b0icz.mongodb.net:27017/test?replicaSet=Cluster0-shard-0&ssl=true&authSource=admin
`, {
  useNewUrlParser: true
}, (err) => {
  if (err) return console.error(err);
  console.log("Connected to mongoDB!");
});
const Money = require("../lib/money.js");
const config = require("../Config.json");

module.exports.run = async (client) => {

  console.log("Ready to moderate.")

  let statuses = {
    0: {
      name: `over ${client.users.size} users in ${client.guilds.size} guilds on 1 shard.`,
      type: "WATCHING"
    },

    1: {
      name: "coding with my developer.",
      type: "STREAMING",
      url: "https://www.twitch.tv/noobyninjq"
    },

    2: {
      name: "bugs and reports",
      type: "LISTENING"
    }
  }

  let i = 0;

  setInterval(() => {
    if (i > Object.keys(statuses).length - 1) i = 0;
    client.user.setActivity(statuses[i].name, {
      type: statuses[i].type,
      url: statuses[i].url
    });
    i++;
  }, 6000)

  await client.guilds.keyArray().forEach(id => {
    Config.findOne({
      guildID: id
    }, (err, guild) => {
      if (err) return console.error(err);

      if (!guild) {
        const newConfig = new Config({
          guildID: id,
          prefix: "?"
        });

        return newConfig.save();
      }
    });
  })

}