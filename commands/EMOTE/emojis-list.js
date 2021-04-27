const Discord = require("discord.js");
module.exports = {
  name: "emojis-list",
  aliases: ["emojislist"],
  async run(bot, message, args, prefix) { let list = [];
    let emojis = message.guild.emojis.cache.array();
    if (emojis.size === 0) return message.channel.send("There are no emojis in this server");
     emojis = emojis.map((e, i) => `\`${i + 1}\` | ${e} | \`${e}\``);
    for (var i = 0; i < emojis.length; i += 10) {
      const items = emojis.slice(i, i + 10);
      list.push(items.join("\n"));
    }
    const symbols = ["⏮️","◀️","⏹️","▶️","⏭️"];
    let page = 0;
    let e  = new Discord.MessageEmbed()
    .setTitle(`Server Emojis`)
    .setDescription(list[page])
    .setFooter(`Page ${page + 1} of ${list.length} (${emojis.length} entries) | Try ${prefix}emojis`)
    .setColor("YELLOW");
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
      }
let embed1 = new Discord.MessageEmbed()
    .setTitle(`Server Emojis`)
    .setDescription(list[page])
    .setFooter(`Page ${page + 1} of ${list.length} (${emojis.length} entries) | Try ${prefix}emojis`)
    .setColor("YELLOW");
await msg.edit(embed1).catch(error => console.error(error));

  }
  }
}

