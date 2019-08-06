const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    let time = parseInt(args[1]);
    let actual = time * 60000;
    let muted = message.guild.roles.find(r => r.name.toLowerCase().includes("muted"));
    let role = message.guild.roles.find(x => x.name.toLowerCase() === "member");


    if(!message.mentions.members.first()){
        return message.channel.send("Please specify a user to mute.");
    }else if(!actual){

        return message.channel.send("Please specify the time to mute the user for.");

    }else if(message.mentions.members.first().roles.has(muted.id)){

        return message.channel.send("This user is already muted.");
    }

    if(!message.member.hasPermission("MANAGE_ROLES")){
        return message.channel.send("You do not have the authorization to do this.");
    }else{
     if(!muted){
         message.guild.createRole({
             name: "muted",
             permissions: []
         }).then(role => {
            role ? message.mentions.members.first().roles.remove(role.id) : console.log("Didn't find a role called 'member'")
             message.mentions.members.first().roles.add(role.id).then(() => {
                 setTimeout(() => {
                    message.mentions.members.first().roles.remove(muted.id);
                    role ? message.mentions.members.first().roles.remove(role.id) : console.log("Didn't find a role called 'member'")
                    message.channel.send(`Successfully unmuted ${member.displayName}`);
                 }, actual);
             message.channel.send(`Successfully muted **${message.mentions.members.first().displayName}** for ${actual} minute(s).`)
             });
         });
     }else if(muted){
        role ? message.mentions.members.first().roles.remove(role.id) : console.log("Didn't find a role called 'member'")
        message.mentions.members.first().roles.add(muted.id).then(member => {
            setTimeout(() => {
              message.mentions.members.first().roles.remove(muted.id);
              role ? message.mentions.members.first().roles.add(role.id) : console.log("Didn't find a role called 'member'")
              message.channel.send(`Successfully unmuted ${member.displayName}`);
            }, actual);
        message.channel.send(`Successfully muted **${message.mentions.members.first().displayName}** for ${actual / 60000} minute(s).`)
        });
     }
    }

}

module.exports.help = {
    name: "tempmute",
    dName: "tempmute",
    desc: "Mutes the specified user for a specified amount of time",
    usage: "?mute @user [time (in minutes)]",
    group: "mod"
}