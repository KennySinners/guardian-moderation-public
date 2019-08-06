const Discord = require("discord.js");
const mongoose = require("mongoose");
const Items = require("../../lib/items");
const Inventory = require("../../lib/inventory");
const Money = require("../../lib/money.js");

module.exports.run = async (client, message, args) => {

    let knife = ["knife", "1"];
    let pistol = ["pistol", "2"];
    let rifle = ["rifle", "3"];
    let crossbow = ["crossbow", "4"];

    Money.findOne({
        guildID: message.guild.id,
        userID: message.member.id
    }, (err, money) => {
        if (err) return console.log(err);

        Inventory.findOne({
            userID: message.member.id,
            guildID: message.guild.id
        }, (err, inv) => {

            if (err) return console.log(err);

            if (knife.includes(args[0].toLowerCase())) {

                if (money.money < 250) {
                    return message.channel.send("You don't have $250 in your bank account!")
                } else

                if (!inv) {
                    const newInv = new Inventory({
                        userID: message.member.id,
                        guildID: message.guild.id,
                        inventory: [`knife`]
                    });
                    message.channel.send(`I couldn't find you in my database, so I added you. I also added a Knife to your inventory!`);
                    return newInv.save().catch(ex => console.log(ex));
                }

                if (inv.inventory.includes(knife[0].toLowerCase())) {
                    return message.channel.send("You already own that item!");
                }
                inv.inventory.push("knife");
                inv.save().catch(ex => console.error(ex));
                return message.channel.send("You successfully bought a " + knife[0] + "!");

            } else if (pistol.includes(args[0].toLowerCase())) {

                if (money.money < 1000) {
                    return message.channel.send("You don't have $1000 in your bank account!");
                }else

                if (!inv) {
                    const newInv = new Inventory({
                        userID: message.member.id,
                        guildID: message.guild.id,
                        inventory: ["pistol"]
                    });
                    message.channel.send(`I couldn't find you in my database, so I added you. I also added a Pistol to your inventory!`);
                    return newInv.save().catch(ex => console.log(ex));
                }

                if (inv.inventory.includes(pistol[0])) return message.channel.send("You already own that item!");
                inv.inventory.push("pistol");
                inv.save().catch(ex => console.log(ex));
                return message.channel.send("You successfully bought a Pistol!");

            } else if (rifle.includes(args[0].toLowerCase())) {

                if (money.money < 2000) {
                    return message.channel.send("You don't have $2000 in your bank account!");
                }else //What is programming?

                if (!inv) {
                    const newInv = new Inventory({
                        userID: message.member.id,
                        guildID: message.guild.id,
                        inventory: [`rifle`]
                    });
                    message.channel.send(`I couldn't find you in my database, so I added you. I also added a Rifle to your inventory!`);
                    return newInv.save().catch(ex => console.log(ex));
                }

                if (inv.inventory.includes(rifle[0])) return message.channel.send("You already own that item!");
                inv.inventory.push("rifle");
                inv.save().catch(ex => console.log(ex));
                return message.channel.send("You successfully bought a Rifle!");

            } else if (crossbow.includes(args[0].toLowerCase())) {

                if (money.money < 750) {
                    return message.channel.send("You don't have $750 in your bank account!");
                } else

                if (!inv) {
                    const newInv = new Inventory({
                        userID: message.member.id,
                        guildID: message.guild.id,
                        inventory: [`crossbow`]
                    });
                    message.channel.send(`I couldn't find you in my database, so I added you. I also added a Crossbow to your inventory!`);
                    return newInv.save().catch(ex => console.log(ex));
                }

                if (inv.inventory.includes(crossbow[0])) return message.channel.send("You already own that item!");
                inv.inventory.push("crossbow");
                inv.save().catch(ex => console.log(ex));
                return message.channel.send("You successfully bought a Crossbow!");

            } else {
                return message.channel.send("That is not a valid item.");
            }
        });
    });
};

module.exports.help = {
    "name": "buy",
    "dName": "buy",
    "desc": "Buy an item from the shop!",
    "usage": "?buy [item]",
    "group": "eco"
};