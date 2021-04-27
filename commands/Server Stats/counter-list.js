


  
const { MessageEmbed } = require("discord.js") 
const Discord = require("discord.js") 
const db = require("quick.db") 
module.exports = {
name: "counters-list", 
aliases: ["list-counters", "counter-list"," list-counter"], 
async run(bot, message, args) {
  
  
  const result = [
`members`, 
`humans`, 
`bots`, 
`channels`, 
`category`, 
`text`, 
`voice`, 
`boosts`, 
`tier`, 
`roles`, 
`bans`, 
`online`, 
`offline`, 
`dnd`, 
`idle`, 
`emojis`,
`static`, 
`animated`
]
const Yes = "✅";
const No = "❎"
const dt = [];
result.forEach(r => db.has(`stats_${message.guild.id}_${r}`) ? dt.push(`\`${Yes} : ${r}\` \(<#${db.get(`stats_${message.guild.id}_${r}`)}>\)`): dt.push(`\`${No} : ${r}\``))

const data = db.all().filter(d => d.ID.startsWith(`stats_${message.guild.id}_`)).map((d, index) => `**${index+1}**. ${d.ID.split("_")[2].charAt(0).toUpperCase()+d.ID.split("_")[2].slice(1)} **|** <#${db.get(d.ID)}>`)

if(!data || !data.length) return message.channel.send("There is no data. No counter is setup.");

message.channel.send(new MessageEmbed().setColor("BLUE").setDescription(dt.join("\n")).setTitle(`Counters List of ${message.guild.name}`).setThumbnail(message.guild.iconURL({dynamic: true})).setFooter(`Total Counters: ${data.length}`).setTimestamp());


}
}

