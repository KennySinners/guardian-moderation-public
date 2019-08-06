const mongoose = require("mongoose");

const xpdb = new mongoose.Schema({
  userID: String,
  guildID: String,
  xp: Number
})

module.exports = mongoose.model("xp", xpdb)
