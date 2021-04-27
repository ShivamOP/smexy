
const db = require("quick.db")

const Discord = require("discord.js");
module.exports = {
name: "rr-remove", 
botPerms: ["MANAGE_ROLES"], 
 userPerms: ["MANAGE_ROLES"], 

aliases: [], 
async run(bot, message, args, prefix) {

const embed = new Discord.MessageEmbed() 
.setColor("RED") 
.setTitle("Reaction Role Remove") 
.addField("Usage", `\`${prefix}rr-remove <#channel/channel_id> <message_id> <emoji>\``) 

if(!args[0] || !args[1] || !args[2]) return message.reply(embed);

let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
if(!channel) return message.reply("Please provide a valid channel ID or mention.")
let msg = await channel.messages.fetch(args[1])
 if(!msg) return message.channel.send(`Please provide a valid message ID. 
Use Developer Mode to get the Copy ID option.
On desktop? Settings -> Appearance -> Enable Developer Mode https://i.imgur.com/oXpu84h.gif
On mobile? Settings -> Behavior -> Enable Developer Mode https://i.imgur.com/xnpXITJ.mp4`);
let emote;
let emoji = Discord.Util.parseEmoji(args[2]);
if(!emoji) return message.reply("Please provide a valid emoji.");
if(emoji.id) { 
emote = bot.emojis.cache.get(emoji.id);
}
else {
  emoji = emoji.name;
}
if(!emoji) return message.reply("Please provide a valid emoji.");


let pog = db.get(`reactions_${message.guild.id}_${msg.id}`)
if(!pog) return message.channel.send("Error: \`Reaction role not found.\`")


let data = pog.find((x) => x.emoji.toString() == emoji.toString());

if(!data) return message.channel.send("Error: \`Reaction role not found.\`");



let index = pog.indexOf(data);
delete pog[index];
var filter = pog.filter((x) => {
return x !== null && x
});
db.set(`reactions_${message.guild.id}_${msg.id}`, filter)

 message.channel.send(`Removed ${emote || emoji} from the reaction role -\n${msg.url}`)


}
}