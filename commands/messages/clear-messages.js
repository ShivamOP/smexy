


const Discord = require("discord.js")
const db = require("quick.db")
module.exports = {
   name: "reset-messages", 
   aliases: ['clear-messages','messages-clear'], 
   time: 30000,
   async run(bot, message, args) {
 
     if(!args.length) { 
let lbMessage = db.all().filter(data => data.ID.startsWith(`messages_${message.guild.id}`)).sort((a, b) => b.data - a.data)      
if(!lbMessage || lbMessage === null) { return
message.channel.send(new Discord.MessageEmbed()
.setColor("RED") 
.setDescription("No one is in the messages leaderboard yet.")   
) 
}

lbMessage.forEach(m => db.delete(`${m.ID}`)) 
message.channel.send(new Discord.MessageEmbed()
.setColor("BLUE") 
.setDescription("I have cleared each user's messages stats.")
)

}  else if(args.length) {
let t = message.guild.members.cache;
let m = message.mentions.members.first() || t.get(args[0]) || t.find(u => u.displayName.toLowerCase() === args[0].toLowerCase()) 
let all = db.fetch(`messages_${message.guild.id}_${m.user.id}`);
if(!all || all === null) return message.channel.send(new Discord.MessageEmbed() 
.setColor("RED")
.setDescription("That user is not ranked at all.")
);
let hi = db.get(`messages_${message.guild.id}_${m.user.id}`);
db.delete(`messages_${message.guild.id}_${m.user.id}`)
message.channel.send(new Discord.MessageEmbed() 
.setColor("BLUE")
.setDescription(`**\`${hi}\`** messages have been cleared from **${m.user.tag}**`) 
) ;

}


}
}