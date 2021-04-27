
const { bot, Message, MessageEmbed } = require('discord.js');
module.exports = {
name: "members-leaderboard", 
aliases: ["lb-members","lbmembers","memberslb","members-lb"], 
async run(bot, message, args) {
    if(!message.guild.me.hasPermission('EMBED_LINKS')) return message.channel.send(`Hey <@${message.author.id}>, I need \`EMBED_LINKS\` perm to run that command !`);

        const members = message.guild.members.cache
            .filter((m) => !m.user.bot)
            .sort((a, b) => a.joinedTimestamp - b.joinedTimestamp);

        const arrayOfMembers = members.array();
        const ids = [];
        arrayOfMembers.forEach((mem) => {
            ids.push(mem.user.id);
        })

const symbols = ["⏮️","◀️","⏹️","▶️","⏭️"];
    let page = 0;

        let index = 1;
        if(ids.length > 10) {
            const chunks = convertChunk(ids, 10);
            const arry = [];
            for (chunk of chunks) {
                const description = chunk.map((v) => `#${index++} **${message.guild.members.cache.get(v).user.tag}**`);
                arry.push(
                    new MessageEmbed()
                        .setTitle('Members Join Leaderboard in ' + message.guild.name)
     .setDescription(description)
                        .setColor('RANDOM')               .setThumbnail(message.guild.iconURL({dynamic: true}))

                )
            }
    const msg = await message.channel.send(arry[0]                   .setFooter(`Page ${page + 1} of ${arry.length} | Total Members: ${message.guild.memberCount}`)) 
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
if(page === arry.length - 1) page = 0; 
      else { page++; }

    } else if (r.emoji.name == "◀️") {
msg.reactions.resolve(r.emoji.name).users.remove(u.id).catch(err => {});
if(page === 0) page = arry.length - 1;
      else {  page--;   }
   
      } else if(r.emoji.name === "⏮️") { 
page = 0;
msg.reactions.resolve(r.emoji.name).users.remove(u.id).catch(err => {});
       
      } else if(r.emoji.name === "⏭️") { 
page = arry.length - 1;
msg.reactions.resolve(r.emoji.name).users.remove(u.id).catch(err => {});
      } else if (r.emoji.name == "⏹️" ) {
       msg.reactions.removeAll();
       return;
      }
await msg.edit(arry[page].setFooter(`Page ${page + 1} of ${arry.length} | Total Members: ${message.guild.memberCount}`)).catch(error => console.error(error));
  }


 function convertChunk(arr, size) {
    const array = [];
    for (let i = 0; i < arr.length; i+= size) {
        array.push(arr.slice(i, i+size))
    }
    return array;
}



        } else {
            const description = ids.map((v) => `#${index++} **${message.guild.members.cache.get(v).user.tag}**`);
            message.channel.send(
                new MessageEmbed()
                 .setTitle('Members Join Leaderboard in ' + message.guild.name)
                 .setThumbnail(message.guild.iconURL({dynamic: true}))
            .setFooter(`Total Members: ${message.guild.memberCount}`)
                 .setDescription(description)
                 .setColor('RANDOM')
            )
        }
    



}
}
