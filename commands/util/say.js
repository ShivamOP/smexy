const Discord = require("discord.js");
const bot = new Discord.Client();


module.exports = {
    name: "say",
    desc: "Shows a list of cmds or info about a specific command.",
    usage: ">help",
    aliases: [],
    perms: "Members",
    async run(bot, message, args) {

    
    const sayMessage = args.join(" "); 
    message.channel.send(sayMessage);

}


}