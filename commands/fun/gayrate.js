
const { MessageEmbed}= require("discord.js")

module.exports = {
name: "gayrate", 
aliases: ["gayr8"],
run: async(bot, message, args) => {
const user = message.mentions.users.first() || bot.users.cache.get(args[0]) || message.author;

const min = Math.ceil(1);
const max = Math.floor(100);
const gay = Math.floor(Math.random() * (max - min + 1)) + min;
   
const embed = new MessageEmbed() 
.setColor("RANDOM") 
.setTitle("gay r8machine")
.setDescription(`${user.toString()} is ${gay}% gay :rainbow_flag:`)
message.channel.send(embed);
}
} 
