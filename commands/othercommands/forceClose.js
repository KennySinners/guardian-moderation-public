const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission("MANAGE_CHANNELS")){
        return;
    }else if(message.channel.parentID === message.guild.channels.find(x=>x.name==="guardian-tickets").id){
        message.channel.delete();
    }else{
        return;
    }

}

module.exports.help = {
  "name": "forceclose",
  "dName": "forceclose",
  "desc": "Closes the ticket forcibly (admins only)",
  "usage": "?forceclose (in a ticket)",
  "group": "other"
}
