



const Discord = require("discord.js")
const db = require("quick.db")
module.exports = {
   name: "leaderboard-messages", 
   aliases: ['messages-leaderboard', 'messages-lb', 'lb-messages'], 
   async run(bot, message, args) {
 
        let lbMessage = db.all().filter(data => data.ID.startsWith(`messages_${message.guild.id}`)).sort((a, b) => b.data - a.data) //lbMessage.length = 10;
if(lbMessage.length > 10) {
let data = [];
let index = 1;
lbMessage.forEach(m => data.push(`**#${index++}**・**${message.guild.members.cache.get(m.ID.split("_")[2]) ? message.guild.members.cache.get(m.ID.split("_")[2]).user.tag : "Unknown User#0000"}**\nMessages: \`${m.data}\`\n\n`) 
) 
let list = [];
   for (let i = 0; i < data.length; i += 10) {
      const items = data.slice(i, i + 10);
      list.push(items.join("\n"));
    }
    const symbols = ["⏮️","◀️","⏹️","▶️","⏭️","#️⃣"];
    let page = 0;

let e  = new Discord.MessageEmbed()
            .setAuthor(`${message.guild.name}\'s Messages Leaderboard`)
            .setColor("0x#FFFF00")
            .setDescription(list[page])
            .setThumbnail(message.guild.iconURL({dynamic: true}))
      .setFooter(`Page ${page +1 } of ${list.length}`)         //   .setFooter(message.client.user.username, message.client.user.displayAvatarURL())
            .setTimestamp()
    const msg = await message.channel.send({ embed: e });
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
      } else if(r.emoji.name === '#️⃣') {
         let m = await message.channel.send("What page do you wish to go to?");
                let collected = await m.channel.awaitMessages(
                    response => message.content,
                    {
                        max: 1,
                        errors: ["time"]
                    }
                );
                try {
                    m.delete();
                    let content = parseInt(collected.first().content);
                    if (content && content > 0 && content <= list.length)
                        page = content - 1;
                } catch (err) {
                    console.log(err.message);
                    m.delete();
                }

        } else if (r.emoji.name == "⏹️" ) {
       msg.reactions.removeAll();
       return;
      }
let embed1 = new Discord.MessageEmbed()
             .setAuthor(`${message.guild.name}\'s Message Leaderboard`)
            .setColor("0x#FFFF00")
            .setDescription(list[page])
            .setThumbnail(message.guild.iconURL({dynamic: true}))
      .setFooter(`Page ${page + 1} of ${list.length}`)
      
         //   .setFooter(message.client.user.username, message.client.user.displayAvatarURL())
            .setTimestamp()
await msg.edit(embed1).catch(error => console.error(error));

  }

} 
else {
  
 let all = db.all().filter(data => data.ID.startsWith(`messages_${message.guild.id}`)).sort((a, b) => b.data - a.data)
      
      
        let finalLb = [];
      all.forEach(async d => {
        
finalLb.push(`**#${all.indexOf(d)+1}**・**${message.guild.members.cache.get(d.ID.split("_")[2]) ? message.guild.members.cache.get(d.ID.split("_")[2]).user.tag : "Unknown User#0000"}**\nMessages: \`${d.data}\`\n\n`) 
           
        })
        
        const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.guild.name}\'s Messages Leaderboard`)
            .setColor("0x#FFFF00")
            .setDescription(finalLb.join("\n\n"))
            .setThumbnail(message.guild.iconURL({dynamic: true}))
         //   .setFooter(message.client.user.username, message.client.user.displayAvatarURL())
            .setTimestamp()
        message.channel.send(embed);
    }

}
}