const Discord = require("discord.js")
const bot = new Discord.Client();


module.exports = {
  name: "rate",
  desc: "Shows a list of cmds or info about a specific command.",
  usage: ">help",
  aliases: ["r8"],
  perms: "Members",
  async run(bot, message, args) {

let ratus = message.mentions.members.first();
if(!ratus) return message.channel.send("Tag someone to rate them!");

let rates = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

let result = Math.floor((Math.random() * rates.length));

if(ratus.user.id === message.author.id) {
  return message.channel.send(`**${message.author.username}**, I'd give you ${result}/10 <:rate:800999457990115328> `);
} else return message.channel.send(`I'd give **__${ratus.user.username}__** ${result}/10 <:rate:800999457990115328> `);

}
}