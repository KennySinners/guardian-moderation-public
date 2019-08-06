const mongoose = require("mongoose")

const levels = new mongoose.Schema({
    guildID: String,
    userID: String,
    level: Number
});

module.exports = mongoose.model("levels", levels);
