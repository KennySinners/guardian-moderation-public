const mongoose = require("mongoose");

const items = new mongoose.Schema({
    items: ["rifle", "pistol", "crossbow", "knife"]
})

module.exports = mongoose.model("items", items);