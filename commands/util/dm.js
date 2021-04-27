const Discord = require('discord.js');
const bot = new Discord.Client();
module.exports = {
    name: "dm-blocked-command-hai-ye-XD",
   aliases: [], 
 async run(bot, message, args) {
const target = message.mentions.users.first() || bot.users.cache.get(args[0]);
const msg = args.join(" ").slice(args[0].length);
if(!target) return message.reply("Unknown User");
const embed = new Discord.MessageEmbed() 
.setColor('RANDOM') 
.setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true})) 
.setFooter(target.user.tag, target.user.displayAvatarURL({dynamic: true})) 
.setDescription(msg)
.setThumbnail(message.guild.iconURL({dynamic: true})) 
.setTimestamp();
target.send(embed)
message.lineReply("Sent a DM to "+"**"+target.tag+"**")
   
 }
}