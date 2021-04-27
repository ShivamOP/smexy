module.exports = async(bot) => {

const manager = bot.giveaways;
const { MessageEmbed } = require("discord.js");

manager.on('endedGiveawayReactionAdded', (giveaway, member, reaction) => {
    reaction.users.remove(member.user);
const embed = new MessageEmbed() 
.setTimestamp() .setColor("ORANGE") 
.setTitle(`Giveaway Entry Denied`)
.setDescription(`**Your entry for [this giveaway](https://discord.com/channels/${giveaway.guildID}/${giveaway.channelID}/${giveaway.messageID}) has been denied!**\nYou cannot participate in an already ended giveaway!\n\n[Invite Me](https://discord.com/oauth2/authorize?client_id=799540871552434186&permissions=2147483647&scope=bot) **|** [Support Server](https://discord.gg/CaCTEJkfZA)`)
return member.send(embed)
});


manager.on('giveawayRerolled', (giveaway, winners) => {
           winners.forEach((member) => {
         member.send(new MessageEmbed().setColor("YELLOW").setDescription(`Congratulations! <@${member.user.id}>, you won: **[${giveaway.prize}](https://discord.com/channels/${giveaway.guildID}/${giveaway.channelID}/${giveaway.messageID})** giveaway in ${member.guild.name}`)
    .setTimestamp()   
    ) 
})
});


manager.on('giveawayEnded', async(giveaway, winners) => {
  
  const channel = bot.guilds.cache.get(giveaway.guildID).channels.cache.get(giveaway.channelID);
  if(!channel) return;
  const msg = await channel.messages.fetch(giveaway.messageID);
  if(!msg) return;
 const m = msg.embeds[0];
  msg.edit(`:tada: **GIVEAWAY ENDED** :tada:`, 
  new MessageEmbed()
 // .setColor()
  .setAuthor(m.author.name)
  .setDescription(`Winner(s): ${winners.map(w => w.toString()).join(", ") || "No valid participations, no winners can be chosen!"}\nHosted by: ${giveaway.hostedBy}`)
  .setFooter("Ended at") 
  .setTimestamp(Date.now())
  ) 
  
  
      winners.forEach((member) => {
         member.send(new MessageEmbed().setColor("YELLOW").setDescription(`Congratulations! <@${member.user.id}>, you won: **[${giveaway.prize}](https://discord.com/channels/${giveaway.guildID}/${giveaway.channelID}/${giveaway.messageID})** giveaway in ${member.guild.name}`)
 
    .setTimestamp()   

         ) 
     });
});

manager.on('giveawayReactionAdded', (giveaway, member, reaction) => {
if(!giveaway.extraData) return;
const data = giveaway.extraData;

const msg = require("quick.db").get(`messages_${member.guild.id}_${member.user.id}`);
if(data.messages && msg < data.messages) {  reaction.users.remove(member.user); 
const embed = new MessageEmbed() 
.setTimestamp() .setColor("RED") 
.setTitle(`Giveaway Entry Denied`)
.setDescription(`**Your entry for [this giveaway](https://discord.com/channels/${giveaway.guildID}/${giveaway.channelID}/${giveaway.messageID}) has been denied!**\nYou need to send \`${msg}\` messages in the server to participate in the giveaway!\nType \`${require("quick.db").get(`${member.guild.id}`) || ">"}messages\` in the server to check your messages!\n\n[Invite Me](https://discord.com/oauth2/authorize?client_id=799540871552434186&permissions=2147483647&scope=bot) **|** [Support Server](https://discord.gg/CaCTEJkfZA)`)
return member.send(embed)
}
if(data.roles) {
let yes = false;
data.roles.forEach(r => { 
if(member.roles.cache.some(role => role.toString() === r.toString())) {
yes = true;
}
});
if(!yes) { reaction.users.remove(member.user);
const embed = new MessageEmbed() 
.setTimestamp() .setColor("RED") 
.setTitle(`Giveaway Entry Denied`)
.setDescription(`**Your entry for [this giveaway](https://discord.com/channels/${giveaway.guildID}/${giveaway.channelID}/${giveaway.messageID}) has been denied!**\nYou do not have one of the required roles to participate in the giveaway!\n${data.roles.map(r => r.name).join(", ")}\n\n[Invite Me](https://discord.com/oauth2/authorize?client_id=799540871552434186&permissions=2147483647&scope=bot) **|** [Support Server](https://discord.gg/CaCTEJkfZA)`)
return member.send(embed) 
}
}

if(data.guild && bot.guilds.cache.get(data.guild.guild.id) && !bot.guilds.cache.get(data.guild.guild.id).members.cache.get(member.user.id)){
      reaction.users.remove(member.user); const embed = new MessageEmbed() 
.setTimestamp() .setColor("RED") 
.setTitle(`Giveaway Entry Denied`)
.setDescription(`**Your entry for [this giveaway](https://discord.com/channels/${giveaway.guildID}/${giveaway.channelID}/${giveaway.messageID}) has been denied!**\nYou are suggested to join [${data.guild.guild.name}](${data.guild.url}) server to participate in the giveaway!\n\n[Invite Me](https://discord.com/oauth2/authorize?client_id=799540871552434186&permissions=2147483647&scope=bot) **|** [Support Server](https://discord.gg/CaCTEJkfZA)`)
return member.send(embed)
}
    const embed = new MessageEmbed() 
.setTimestamp() 
.setColor("BLUE") 
.setTitle(`Giveaway Entry Approved`)
.setDescription(`**Your entry for [this giveaway](https://discord.com/channels/${giveaway.guildID}/${giveaway.channelID}/${giveaway.messageID}) has been approved!**\n\n[Invite Me](https://discord.com/oauth2/authorize?client_id=799540871552434186&permissions=2147483647&scope=bot) **|** [Support Server](
https://discord.gg/CaCTEJkfZA)`)
return member.send(embed)
});

manager.on('giveawayReactionRemoved', (giveaway, member, reaction) => {
const embed = new MessageEmbed() 
.setTimestamp() 
.setColor("RED") 
.setTitle(`Giveaway Entry Denied`)
.setDescription(`**Your entry for [this giveaway](https://discord.com/channels/${giveaway.guildID}/${giveaway.channelID}/${giveaway.messageID}) has been denied!**\nYou have unreacted to the giveaway!\n\n[Invite Me](https://discord.com/oauth2/authorize?client_id=799540871552434186&permissions=2147483647&scope=bot) **|** [Support Server](
https://discord.gg/CaCTEJkfZA)`)
return member.send(embed)
});




}