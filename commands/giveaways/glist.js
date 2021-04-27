const Discord = require('discord.js');
const bot = new Discord.Client();
const moment = require("moment");
module.exports = {
    name: "glist",
    
    desc: "Shows a list of cmds or info about a specific command.",
    aliases: [],
        async run(bot, message, args) {

   let id = message.guild.id;
let onServer = bot.giveaways.giveaways.filter((g) => (g.guildID === id && !g.ended));
let embed = new Discord.MessageEmbed()
let i = 1;
let data = [];
if(!onServer || !onServer.length) {
return message.channel.send(new Discord.MessageEmbed().setDescription('Currently, No Giveaways are running on this server.').setColor("RED")) }

  onServer.forEach(giveaway => {
   data.push([`**${i++}**. Giveaway ID - ${giveaway.messageID}`,`**Hosted By:** ${giveaway.hostedBy}\n**Prize:** ${giveaway.prize}\n**Started:** ${moment(giveaway.startAt).fromNow()}\n**Ends at:** ${moment(giveaway.endAt).format('MMMM Do YYYY, h:mm:ss a')}\n**Winners:** ${giveaway.winnerCount}`])
        })


let page = 0;
let list = [];
if(data.length > 5) {
for (let index = 0; index < data.length; index += 5) {
    list.push(data.slice(index,index+5)) 
}
  const symbols = ["⏮️","◀️","⏹️","▶️","⏭️"];

const embed = new Discord.MessageEmbed().setTitle(`Giveaways List of ${message.guild.name}`)
.setColor("BLUE")
list[0].forEach(m => embed.addField(m[0], m[1])) 
embed.setFooter(`Page ${page +1} of ${list.length} | Total Giveaways: ${onServer.length}`)
.setThumbnail(message.guild.iconURL({dynamic: true}))
.setDescription(`The following are the current active giveaways on this server.`)    
const msg = await message.channel.send(embed)
    symbols.forEach(symbol => msg.react(symbol));
    let doing = true;
    while (doing) {
    let r;
    const filter = (r, u) => symbols.includes(r.emoji.name) && u.id == message.author.id;
    try { r = await msg.awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] }) }
    catch { return message.channel.send("Command timed out.") }
    const u = message.author;
    r = r.first();

    if (r.emoji.name == "▶️") {
msg.reactions.resolve(r.emoji.name).users.remove(u.id).catch(err => {});
if(page === list.length - 1) page = 0; 
      else { page++; }
    } else if (r.emoji.name == "◀️") {
msg.reactions.resolve(r.emoji.name).users.remove(u.id).catch(err => {});
if(page === 0) page = list.length - 1;
      else {  page--;   }
   
      } else if(r.emoji.name === "⏮️") { 
page = 0;
msg.reactions.resolve(r.emoji.name).users.remove(u.id).catch(err => {});
       
      } else if(r.emoji.name === "⏭️") { 
page = list.length - 1;
msg.reactions.resolve(r.emoji.name).users.remove(u.id).catch(err => {});
      } else if (r.emoji.name == "⏹️" ) {
       msg.reactions.removeAll();
       return;
      }

const embed1 = new Discord.MessageEmbed().setTitle(`Giveaways List of ${message.guild.name}`)
.setColor("BLUE") 
list[page].forEach(m => embed1.addField(m[0], m[1])) 
embed1.setFooter(`Page ${page +1} of ${list.length} | Total Giveaways: ${onServer.length}`)
.setThumbnail(message.guild.iconURL({dynamic: true}))
.setDescription(`The following are the current active giveaways on this server.`)
await msg.edit(embed1)
  }
  }


else { data.forEach(g => embed.addField(g[0],g[1]))
embed.setTitle(`Giveaways List of ${message.guild.name}`)
.setColor("BLUE")
.setTimestamp()
.setFooter(`Total Giveaways: ${onServer.length}`)
.setThumbnail(message.guild.iconURL({dynamic: true}))
.setDescription(`The following are the current active giveaways on this server.`)
 message.channel.send(embed)
}
}
}
        