const mongoose = require("mongoose");

const igchannels = new mongoose.Schema({
    guildID: String,
    channel: Array
})

module.exports = mongoose.model("ignored_channels", igchannels)