const mongoose = require("mongoose")

const moneydb = mongoose.Schema({
  userID: String,
  guildID: String,
  money: Number
})

module.exports = mongoose.model("Money", moneydb);
