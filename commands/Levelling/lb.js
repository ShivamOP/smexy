const Discord = require('discord.js');

const db = require('quick.db')
const math = require('mathjs')
module.exports = {
    name: "leaderboard-levels",
   
    aliases: ['levels-leaderboard', 'levels-lb', 'lb-levels', 'leaderboard-rank','rank-leaderboard', 'rank-lb', 'lb-rank'],
        async run(bot, message, args, prefix) {
    
            
     const Levels = bot.levels;      
   const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, message.guild.members.cache.size);

if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");
 
const leaderboard = await Levels.computeLeaderboard(bot, rawLeaderboard, true); // We process the leaderboard.
 
const lb = leaderboard.map(e => `**\#${e.position}**・ **${e.username}#${e.discriminator}**\nLevel: \`${e.level}\`\nXP: \`${e.xp.toLocaleString()}\/${Levels.xpFor(Number(e.level + 1)).toLocaleString()}\``)


if(lb.length < 10) {
const embed = new Discord.MessageEmbed()
.setColor('#ffff00') 
.setTimestamp()
.setThumbnail(message.guild.iconURL({dynamic: true}))
.setDescription(`${lb.join("\n\n")}`)
.setTitle(`Leaderboard for ${message.guild.name}`);
message.channel.send(embed)
} else {
  let list = [];
   for (let i = 0; i < lb.length; i += 10) {
      const items = lb.slice(i, i + 10);
      list.push(items.join("\n"));
    }
    const symbols = ["⏮️","◀️","⏹️","▶️","⏭️","#️⃣"];
    let page = 0;

let e  = new Discord.MessageEmbed()
            .setAuthor(`${message.guild.name}\'s Rank Leaderboard`)
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
      } else if (r.emoji.name == "⏹️" ) {
       msg.reactions.removeAll();
       return;
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

        } 
let embed1 = new Discord.MessageEmbed()
             .setAuthor(`${message.guild.name}'s Rank Leaderboard`)
            .setColor("0x#FFFF00")
            .setDescription(list[page])
            .setThumbnail(message.guild.iconURL({dynamic: true}))
      .setFooter(`Page ${page + 1} of ${list.length}`)
      
         //   .setFooter(message.client.user.username, message.client.user.displayAvatarURL())
            .setTimestamp()
await msg.edit(embed1).catch(error => console.error(error));

  }

}
} 
}