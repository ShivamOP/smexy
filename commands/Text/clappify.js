const Discord = require("discord.js");

const bot = new Discord.Client();
 


module.exports = {
    name: "clappify",
    desc: "Shows a list of cmds or info about a specific command.",
    aliases: ['clap'],
        async run(bot, message, args) {

    if (args.length < 1) return message.channel.send("Please provide some text to clappify")

   message.channel.send(':clap:' + args.join(':clap:') + ':clap:') 

    

}

}