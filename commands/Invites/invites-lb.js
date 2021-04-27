
const { MessageEmbed } = require("discord.js")
const  Discord = require("discord.js")
module.exports = {
name: "invites-leaderboard",
aliases: ["leaderboard-invites","lb-invites","invites-lb"],
async run(bot, message, args, prefix) {
    const { guild } = message

  try { 
   // guild.fetchInvites().then(async(invitess) => {
   const invitess = await guild.fetchInvites().catch(e => console.error(e));
   
      const inviteCounter = {
      }
let invites = invitess.filter(inv => inv.uses !== 0);
      invites.forEach(async(invite) => {
        const { uses, inviter } = invite
        const { username, discriminator } = inviter
        const name = `${username}#${discriminator}`

        inviteCounter[name] = (inviteCounter[name] || 0) + uses
      })

      let data = [];
      const sortedInvites = Object.keys(inviteCounter).sort(
        (a, b) => inviteCounter[b] - inviteCounter[a]
     );

let index = 1;
      sortedInvites.forEach(async invite => {
        const count = inviteCounter[invite]
        data.push(`**${index++}**・**${invite}**\nInvites: \`${count}\`\n\n`) 
      })
      
      if(!data || !data.length) return message.channel.send("There is no one in the invites leaderboard yet.")
if(data.length > 10) {
let list = [];
   for (let i = 0; i < data.length; i += 10) {
      const items = data.slice(i, i + 10);
      list.push(items.join("\n"));
    }
    const symbols = ["⏮️","◀️","⏹️","▶️","⏭️","#️⃣"];
    let page = 0;

let e  = new Discord.MessageEmbed()
            .setAuthor(`${message.guild.name}\'s Invites Leaderboard`)
            .setColor("0x#FFFF00")
            .setFooter(`Page ${page + 1} of ${list.length}`)
            .setDescription(list[page])
            .setThumbnail(message.guild.iconURL({dynamic: true}))
  
            .setTimestamp()
   let msg = await message.channel.send({ embed: e }).catch(err => console.error(err));
    symbols.forEach(symbol => msg.react(symbol).catch(err => console.error(err)));
    let doing = true;
    while (doing) {
    let r;
    const filter = (r, u) => symbols.includes(r.emoji.name) && u.id == message.author.id;
    try { r = await msg.awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] }) }
    catch { return message.channel.send("Command timed out.") }
    const u = message.author;
  if(r.first()) r = r.first();

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
                    if (content && content > 0 &&  content <= list.length) page = content - 1;
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
            .setFooter(`Page ${page + 1} of ${list.length}`)
            .setDescription(list[page])
            .setThumbnail(message.guild.iconURL({dynamic: true}))
         //   .setFooter(message.client.user.username, message.client.user.displayAvatarURL())
            .setTimestamp()
await msg.edit(embed1).catch(error => console.error(error));

  } 
  } else {
        const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.guild.name}\'s Invites Leaderboard`)
            .setColor("0x#FFFF00")
            .setDescription(data.join("\n"))
            .setThumbnail(message.guild.iconURL({dynamic: true}))
         //   .setFooter(message.client.user.username, message.client.user.displayAvatarURL())
            .setTimestamp()
        message.channel.send(embed);
    }


     
    
  } catch(e) {
  return message.channel.send(`Error: \`${e}\``)
 }
  }
}
