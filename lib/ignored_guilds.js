const mongoose = require("mongoose");

const iguilds = new mongoose.Schema({
    userID: String,
    guildID: Array
})

module.exports = mongoose.model("ignored_guilds", iguilds)