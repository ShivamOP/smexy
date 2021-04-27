const Discord = require('discord.js');

const bot = new Discord.Client();

module.exports = {
    name: "uppercase",
    desc: "Shows a list of cmds or info about a specific command.",
    aliases: [],
    async run(bot, message, args){
          
          if(!args[0]) return message.reply(`Please enter something!`);
          const text = args.join(" ");
          const textxd = text.toUpperCase();
          message.channel.send(textxd)
          

}
}