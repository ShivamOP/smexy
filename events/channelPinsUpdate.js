module.exports = async(bot, channel, time) => {
if(!channel.guild) return;
const { MessageEmbed } = require("discord.js");
const guild = channel.guild;
 if (!guild.me.hasPermission("MANAGE_WEBHOOKS")) return;
    const w = await guild.fetchWebhooks();
    const log = w.find((w) => w.name === "Smexy Logger");
if(log) {

const embed = new MessageEmbed() 
.setColor("GREY") 
.setFooter(`Channel ID: ${channel.id}`)
.setTimestamp() 
.setTitle(`Channel Pins Updated`)
.addField(`❯ Channel`, `${channel.toString()} (${channel.id})`) 
.addField(`❯ Pinned At`, time)
return log.send({
username: "Smexy", 
avatarURL: " https://cdn.discordapp.com/emojis/815236313116573727.png", 
embeds: [embed]
})


}
}
    