
const Discord = require("discord.js");
const bot = new Discord.Client();

module.exports = {
  name: "reverse",
  desc: "Shows a list of cmds or info about a specific command.",
  usage: ">help",
  aliases: [],
  perms: "Members",
  async run(bot, message, args) {

  if (args.length < 1) return message.channel.send(`You must input some text to be reversed!`);
      
  message.channel.send(args.join(' ').split('').reverse().join(''));
 }

}