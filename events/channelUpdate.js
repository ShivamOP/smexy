module.exports = async (bot, oldChannel, channel) => {
if(!channel.guild) return;
const { MessageEmbed } = require("discord.js");
const guild = channel.guild;
 if (!guild.me.hasPermission("MANAGE_WEBHOOKS")) return;
    const w = await guild.fetchWebhooks();
    const log = w.find((w) => w.name === "Smexy Logger");
if(log) {
    let embed = new MessageEmbed() 
.setTitle(`Channel Updated`) 
.setDescription(`${channel.toString()} was updated ${channel.parent ? `(Category - ${channel.parent.toString()})` : ""}`)
.setColor("BLUE") 
.setFooter(`Channel ID: ${channel.id}`)
        .setTimestamp();
    if (oldChannel.name != channel.name) {
     embed
.addField(`❯ Old Channel Name`, oldChannel.name) 
.addField(`❯ New Channel Name`, channel.name);
    }

if(oldChannel.type != channel.type) {
     embed
.addField(`❯ Old Channel Type`, oldChannel.type.charAt(0).toUpperCase()+oldChannel.type.slice(1)) 
.addField(`❯ New Channel Type`, channel.type.charAt(0).toUpperCase()+channel.type.slice(1));
}

if((oldChannel.topic != channel.topic) || (oldChannel.topic && !channel.topic) || (!oldChannel.topic && channel.topic)) {
  embed
  .addField(`❯ Old Channel Topic`, oldChannel.topic || "None") 
    .addField(`❯ New Channel Topic`, channel.topic || "None") 
}
if(oldChannel.rawPosition != channel.rawPosition) {
  embed
  .addField(`❯ Old Channel Position`, oldChannel.rawPosition) 
    .addField(`❯ New Channel Position`, channel.rawPosition) 
}

if((oldChannel.nsfw && !channel.nsfw) || (!oldChannel.nsfw && channel.nsfw)) {
      embed.addField(`❯ Old Channel was NSFW ?`, oldChannel.nsfw ? "Yes" : "No")
      embed.addField(`❯ New Channel is NSFW ?`, channel.nsfw ? "Yes" : "No")
}
if(oldChannel.bitrate != channel.bitrate) {
embed
.addField(`❯ Old Channel Bitrate`, oldChannel.bitrate) 
.addField(`❯ New Channel Bitrate`, channel.bitrate);
}
if(oldChannel.userLimit != channel.userLimit) {
embed
.addField(`❯ Old Channel User Limit`, oldChannel.userLimit) 
.addField(`❯ New Channel User Limit`, channel.userLimit);
}
return log.send({
username: "Smexy", 
avatarURL: " https://cdn.discordapp.com/emojis/815236313116573727.png", 
embeds: [embed]
})
}
}
