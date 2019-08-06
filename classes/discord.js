const { Collection, GuildMember } = require("discord-js");
const moment = require("moment");
const Col = new Collection();

class User extends GuildMember {

    constructor(client, data) {
        super(client, data)
    }

    account(guild, format) {
        
        this.guild = this.client.guilds.get(guild);

        if(!this.guild) {
            throw new Error("Client Error: Client was unable to find the provided recipient.");
        } else if(!this) {
            throw new Error("SyntaxError: Member ID was not provided");
        }

        format ? moment(this.user.createdAt).format("YYYY/MM WW:DD:HH:MM") : this.user.createdAt;
    }
}