
const { MessageEmbed } = require("discord.js");
const db = require("quick.db")
module.exports = {
name: "suggest", 
aliases: ["suggestion"], 
usage: "<suggestion/message>",
async run(bot, message, args, prefix) {
const check = db.get(`suggestion_${message.guild.id}`);
if(check === null || !check) return message.channel.send(`Suggestion module is not enabled. Enable it with \`${prefix}suggestionschannel\` .`) 
if(!args.length) return message.reply("You need to actually suggest something for this command to work.") 
const c = message.guild.channels.cache.get(check);
if(!c) return message.channel.send(`Error: \`Suggestion channel not found.\``);


db.add(`scount_${message.guild.id}`, 1)
let count = db.get(`scount_${message.guild.id}`);

const embed = new MessageEmbed()
.setColor("BLUE") 
.setAuthor(message.author.tag + " | " + message.author.id, message.author.displayAvatarURL({dynamic: true})) 

.setTitle(`Suggestion #${count}`) 
.setTimestamp() 
.setFooter(`⬆️ Like it | ⬇️ Don't like it | ❓ What`) 
.setDescription(args.join(" ")) 
.addField("Status", "Pending") 
const msg = await c.send(embed) 
const emo = ["⬆️", "⬇️","❓"]
msg.react(emo[0]) 
msg.react(emo[1]) 
msg.react(emo[2]) 
db.set(`s_${message.guild.id}_${count}`, msg.id)
message.reply(`Your suggestion has been posted in <#${db.get(`suggestion_${message.guild.id}`)}>`) 



}
}