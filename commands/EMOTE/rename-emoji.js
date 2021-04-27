
 
const Discord = require('discord.js')
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "rename-emoji",
aliases: ["renameemoji"], 
desc: "Renames a emoji", 
userPerms: ["MANAGE_EMOJIS"], 
botPerms: ["MANAGE_EMOJIS"], 
usage: "[ emoji | emoji_id | emoji_name ] <new_name>", 
  async run(bot, message, args) {
    if (!message.member.hasPermission("MANAGE_EMOJIS")) {
return message.channel.send(`:x: | **You Don't Have Permission To Use This Command**`)
}
if (!message.guild.me.hasPermission("MANAGE_EMOJIS")) {
return message.channel.send(`:x: | **I Don't Have Permission To manage emojis**`)
}
if (!args[0]) return message.channel.send("Please provide a valid emoji.");
if (!args[1]) return message.channel.send("Please provide a new name of the emoji to change.")
let emo = Discord.Util.parseEmoji(args[0]);
if(!emo.id) { emo = message.guild.emojis.cache.find(e => e.name.toLowerCase() === args[0].toLowerCase()) || message.guild.emojis.cache.get(args[0]);
} else {
  emo = message.guild.emojis.cache.get(emo.id) 
}
if(!emo) return message.channel.send("Emoji not found.")

try {
     emo.setName(args.slice(1).join("_")).catch(err => { return message.channel.send(`An error occured: \`${err}\``) }) 
     message.channel.send(`${emo.toString()} The name for the emoji has been changed to ` + args.slice(1).join("_"))
   } catch (err) {
     return message.channel.send(`An error occured: \`${err}\``)
   }
  }
}
