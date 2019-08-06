const mongoose = require("mongoose");

const daily = new mongoose.Schema({
    userID: Array
})

module.exports = mongoose.model("dailyUsers", daily)