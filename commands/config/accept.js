
const { MessageEmbed } = require("discord.js");
const db = require("quick.db")
module.exports = {
name: "accept", 
desc: "To accept a suggestion",
usage: "Suggestion <NO/ID>",
userPerms: ["ADMINISTRATOR"],
botPerms: [],
aliases: ["suggestion-accept"], 
async run(bot, message, args,prefix) {
    
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply("You need \`ADMINISTRATOR\` permission to use this command") 
const check = db.get(`suggestion_${message.guild.id}`);
if(check === null || !check) return message.channel.send(`Suggestion module is not enabled. Enable it with \`${prefix}suggestionschannel\` .`) 

const c = message.guild.channels.cache.get(check);
if(!c) return;

if(isNaN(args[0]) || !parseInt(args[0])) return message.channel.send(`\'${args[0] || " "}\' is not a valid suggestion No/ID. 
Correct Usage Example: \`${prefix}accept 4\``);
let result = db.get(`s_${message.guild.id}_${args[0]}`)
if(!result || result === null) return message.channel.send(`\'${args[0]}\' is not a valid suggestion No/ID. 
Correct Usage Example: \`${prefix}accept 4\``);

args.shift() 
const reason = args.join(" ") || 'None';
const msg = await c.messages.fetch(result)
const embed = new MessageEmbed()
.setColor("YELLOW") 
.setAuthor(msg.embeds[0].author.name, msg.embeds[0].author.iconURL)
.setTitle(msg.embeds[0].title) 
.setTimestamp(msg.embeds[0].timestamp) 
//.setFooter(`⬆️ Like it | ⬇️ Don't like it | ❓ What`) 
.setDescription(msg.embeds[0].description)
.addField("Status", `Accepted`)  
.addField(`Reason from ${message.author.tag}`, reason) 
msg.reactions.removeAll();
msg.edit(embed).then(() => { 
const user = msg.embeds[0].author.name.split(" | ")[1];
const member = message.guild.members.cache.get(user)
if(!member || !user) return;
try { member.send(new MessageEmbed() 
.setColor("RANDOM") 
.setAuthor(msg.embeds[0].author.name, msg.embeds[0].author.iconURL)
.setTitle(`Your Suggestion Was Accepted`) 
.setURL(msg.url) 
.setTimestamp() 
.setDescription(msg.embeds[0].description)
.setFooter(msg.guild.name, msg.guild.iconURL({dynamic: true})) 
.addField(`Reason from ${message.author.tag}`, reason) 
)
} catch (error) {

}
})
}
}