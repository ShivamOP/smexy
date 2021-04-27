

module.exports = {
name: "serverinfo", 
aliases: ["server", "guild", "guildinfo"], 
async run(bot, message, args) {

const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const { stripIndent } = require('common-tags');
const verificationLevels = {
  NONE: 'None',
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  VERY_HIGH: 'Very High'
};
const notifications = {
  ALL: 'All',
  MENTIONS: 'Mentions'
};

const color = message.guild.me.hexColor === "#000000" ? "RANDOM" : message.guild.me.hexColor;

    // Get roles count
    const roleCount = message.guild.roles.cache.size - 1; // Don't count @everyone
    
    // Get member stats
    const members = message.guild.members.cache.array();
    const memberCount = members.length;
    const online = members.filter((m) => m.presence.status === 'online').length;
    const offline =  members.filter((m) => m.presence.status === 'offline').length;
    const dnd =  members.filter((m) => m.presence.status === 'dnd').length;
    const idle =  members.filter((m) => m.presence.status === 'idle').length;
    const bots = members.filter(b => b.user.bot).length;
const humans = members.filter(u => !u.user.bot).length;
    

    const channels = message.guild.channels.cache.array();
    const channelCount = channels.length;
    const textChannels = 
      channels.filter(c => c.type !== 'voice' && c.type !== 'category').length;
    const voiceChannels = channels.filter(c => c.type === 'voice').length;
 
    const cat = channels.filter(c => c.type === 'category').length;
    

const g = message.guild;
    const embed = new MessageEmbed()
 .addField("General", [
`**❯ Name:** [${message.guild.name}](${g.iconURL({dynamic: true})}) (ID: ${message.guild.id})`, 
`**❯ Owner:** ${message.guild.owner} (ID: ${message.guild.ownerID})`, 
`**❯ Region:** ${message.guild.region}`, 
`**❯ Creation Time:** ${message.guild.createdAt.toDateString()} ${moment(message.guild.createdAtTimestamp).fromNow()}`, 
`**❯ Verification Level:** ${verificationLevels[message.guild.verificationLevel]}`,
`**❯ Boost Tier:** ${g.premiumTier}`, 
`**❯ Vanity Link:** ${g.vanityURLCode ? `https://discord.gg/${g.vanityURLCode}` : 'None'}`,

`**❯ Rules Channel:** ${message.guild.rulesChannel ? `${message.guild.rulesChannel} (ID: ${message.guild.rulesChannelID})` : `None`}`, 
`**❯ System Channel:** ${g.systemChannel ? `${g.systemChannel} (ID: ${g.systemChannelID})` : `None`}`, 
`**❯ AFK Channel:** ${g.afkChannel ? `${g.afkChannel} (ID: ${g.afkChannelID})` : `None`}`, 
`**❯ AFK Timeout:** ${g.afkChannel ? `${moment.duration(message.guild.afkTimeout * 1000).asMinutes()} minutes` : `None`}`, 
`**❯ Default Notifications:** ${notifications[message.guild.defaultMessageNotifications]}`, 
`**❯ Partnered:** ${g.partnered ? 'Yes' : 'No'}`, 
`**❯ Verified:** ${g.verified ? 'Yes' : 'No'}`, 
`**❯ Features:** ${g.features.join(", ") || 'None'}`, 
`\u200b`, 
]) 

.addField("Statics", [
`**❯ Member Count:** ${g.memberCount}`, 
`**❯ Humans Count:** ${humans}`,
`**❯ Bots Count:** ${bots}`,
`**❯ Emoji Count:** ${g.emojis.cache.size}`, 
`**❯ Static Emojis:** ${g.emojis.cache.filter(r => !r.animated).size}`, 
`**❯ Animated Emojis:** ${g.emojis.cache.filter(e => e.animated).size}`, 
`**❯ Channel Count:** ${g.channels.cache.size}`, 
`**❯ Category Channels:** ${cat}`,
`**❯ Text Channels:** ${textChannels}`,
`**❯ Voice Channels:** ${voiceChannels}`,
`**❯ Role Count:** ${g.roles.cache.size - 1}`, 
`**❯ Boost Count:** ${g.premiumSubscriptionCount}`,
`\u200b`
])
.addField("Presence",[
`**❯ Online:** ${online}`, 
`**❯ Do Not Disturb:** ${dnd}`, 
`**❯ Idle:** ${idle}`, 
`**❯ Offline:** ${offline}`, 
// `\u200b`, 
]) 
if(g.splashURL()) {
embed.addField(`\u200b`,`**Server Splash**`) 
//embed.setThumbnail(message.guild.iconURL({ dynamic: true }))
}
   


embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
     embed.setTimestamp()
      embed.setColor(color);
embed.setThumbnail(message.guild.iconURL({dynamic: true}))

    if (message.guild.description) embed.setDescription(message.guild.description);
    if (message.guild.splashURL()) embed.setImage(message.guild.splashURL({ format: "png", size: 1024})); 
   if(message.guild.bannerURL()) {
const e = new MessageEmbed()
.setColor(color)
.setDescription("**Server Banner**")
.setImage(g.bannerURL({format: "png",size: 1024}))
message.channel.send(embed).then(() => message.channel.send(e))
}
   else {           
    message.channel.send(embed);
 }
 
  
}
};
