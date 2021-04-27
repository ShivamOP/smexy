module.exports = async(bot, members, guild) => {
const { MessageEmbed } = require("discord.js");
 if (!guild.me.hasPermission("MANAGE_WEBHOOKS")) return;
    const w = await guild.fetchWebhooks();
    const log = w.find((w) => w.name === "Smexy Logger");
if(log) {
const mem = members.map((m, index) => `**${index}**. ${m.toString} (${m.user.id})`).join("\n");
const embed = new MessageEmbed() 
.setColor("BLACK") 
.setFooter(`Guild ID: ${guild.id}`)
.setTimestamp() 
.setTitle(`Members Chunk / Raid`)
.addField(`❯ Members [${members.size}]`, (mem.length > 1024) ? mem.slice(0, 1021) : mem)

 return log.send({
username: "Smexy", 
avatarURL: " https://cdn.discordapp.com/emojis/815236313116573727.png", 
embeds: [embed]
})


}
}
    



