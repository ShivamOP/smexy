module.exports = async(bot, oldUser, newUser) => {
    if(oldUser.bot) return;
let o = oldUser;
let n = newUser;
const { MessageEmbed } = require("discord.js");
let embeds = [];
bot.guilds.cache.forEach(async guild => {
if(!guild.members.cache.has(newUser.id)) return;
 if (!guild.me.hasPermission("MANAGE_WEBHOOKS")) return;
    const w = await guild.fetchWebhooks();
    const log = w.find((w) => w.name === "Smexy Logger");
if(log) {
  const em = new MessageEmbed() 
.setColor("ORANGE") 
.setTimestamp() 
.setFooter(`User ID: ${n.id}`) 
.setAuthor(n.tag, n.displayAvatarURL({dynamic: true})) 
.setDescription(`${n.toString()} **updated their profile**`)


/* if(o.tag != n.tag) {
embed
.addField(`❯ Old User Tag`, o.tag) 
.addField(`❯ New User Tag`, n.tag)

} */
if(o.discriminator != n.discriminator) {
const embed = new MessageEmbed() 
.setColor("BLUE") 
.setTimestamp() 
.setFooter(`User ID: ${n.id}`) 
.setAuthor(n.tag, n.displayAvatarURL({dynamic: true})) 
.setDescription(`${n.toString()} updated their **discriminator**`)

.addField(`❯ Old User Discriminator`, o.discriminator) 
.addField(`❯ New User Discriminator`, n.discriminator);
  
  embeds.push(embed)
}
if(o.username != n.username) {
const embd = new MessageEmbed() 
.setColor("BLUE") 
.setTimestamp() 
.setFooter(`User ID: ${n.id}`) 
.setAuthor(n.tag, n.displayAvatarURL({dynamic: true})) 
.setDescription(`${n.toString()} updated their **username**`)

.addField(`❯ Old User Name`, o.username) 
.addField(`❯ New User Name`, n.username);

embeds.push(embd)
}

if(o.avatar != n.avatar) {
const emb = new MessageEmbed() 
.setColor("BLUE") 
.setTimestamp() 
.setFooter(`User ID: ${n.id}`) 
.setAuthor(n.tag, n.displayAvatarURL({dynamic: true})) 
.setDescription(`${n.toString()} updated their **avatar**`)
.addField(`❯ Avatar`, `\u200b`)
.setImage(o.displayAvatarURL({dynamic: true})) 
.setThumbnail(n.displayAvatarURL({dynamic: true}))

embeds.push(emb)
}




return log.send({
username: "Smexy", 
avatarURL: " https://cdn.discordapp.com/emojis/815236313116573727.png", 
embeds: embeds.length ? embeds : [em]
}) 
}

})
}
