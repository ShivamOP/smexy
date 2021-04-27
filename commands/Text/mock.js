const Discord = require("discord.js");

const randomizeCase = word => word.split('').map(c => Math.random() > 0.5 ? c.toUpperCase() : c.toLowerCase()).join('');

const bot = new Discord.Client();
 


module.exports = {
    name: "mock",
    desc: "Shows a list of cmds or info about a specific command.",
    aliases: [],
        async run(bot, message, args) {

    if (args.length < 1) return message.channel.send("Please provide some text to Mock !")

   message.channel.send(args.map(randomizeCase)) 

    

}

}