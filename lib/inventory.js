const mongoose = require("mongoose");

const inventory = new mongoose.Schema({
    userID: String,
    guildID: String,
    inventory: Array
})

module.exports = mongoose.model("Inventory", inventory);