
module.exports = {
name: "roles", 
aliases: ["roles-list"], 
async run(bot, message, args) {
const data = [];
let index = 1;
message.guild.roles.cache.filter(role => (role.name !== "@everyone") || (role.id !== message.guild.id)).sort((a,b) => b.position - a.position).forEach(r => data.push(`**${index++}**. ${r} - \`${r.members.array().length}\` members`) ) 

if(data.length > 10) {
let list = [];
const {MessageEmbed,splitMessage} = require("discord.js")
for (var i = 0; i < data.length; i += 10) {
      const items = data.slice(i, i + 10);
      list.push(items.join("\n"));
    }
    const symbols = ["⏮️","◀️","⏹️","▶️","⏭️","#️⃣"];
    let page = 0;
    let e  = new MessageEmbed()
.setColor("BLUE")
 .setFooter(`Page ${page+1} of ${list.length} | Total Roles: ${data.length}`) 
.setTitle(`Roles List of ${message.guild.name}`) 
.setDescription(list[page]) 
.setThumbnail(message.guild.iconURL({dynamic: true})) 
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
let embed1 = new MessageEmbed()
    .setColor("BLUE")
 .setFooter(`Page ${page+1} of ${list.length} | Total Roles: ${data.length}`) 
.setTitle(`Roles List of ${message.guild.name}`) 
.setDescription(list[page]) 
.setThumbnail(message.guild.iconURL({dynamic: true})) 
await msg.edit(embed1).catch(error => console.error(error));

  }
 
}
else {
message.channel.send(new MessageEmbed() 
.setColor("BLUE")
// .setFooter(`Page ${index++} of ${splitDescription.length}`) 
.setTitle(`Roles List of ${message.guild.name}`) 
.setDescription(data.join("\n")) 
.setThumbnail(message.guild.iconURL({dynamic: true})) 
) 

}

}
}