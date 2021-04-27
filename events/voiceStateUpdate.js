module.exports = async(bot, oS, nS) => {
const { MessageEmbed } = require("discord.js");
const embeds = [];
const guild = nS.member.guild;
 if (!guild.me.hasPermission("MANAGE_WEBHOOKS")) return;
    const w = await guild.fetchWebhooks();
    const log = w.find((w) => w.name === "Smexy Logger");
if(log) {
    let u = nS.member;
let m = u.toString();
const embed = new MessageEmbed() 
 .setColor("YELLOW") 
.setTimestamp() 
.setFooter(`Member ID: ${u.user.id}`) 
.setAuthor(u.user.tag, u.user.displayAvatarURL({dynamuc: true}))

.setDescription(`${u.toString()} updated their **voice state**`)

    if (!oS.streaming && nS.streaming) {
embed.setDescription(`${m} started **streaming** in ${nS.channel.toString()} (${nS.channel.toString()})`)
.setColor("BLUE")
}
    if (oS.streaming && !nS.streaming)  {
embed.setDescription(`${m} stopped **streaming** in ${oS.channel.toString()} (${oS.channel.toString()})`)
.setColor("#EFB666")
}
    if (!oS.serverDeaf && nS.serverDeaf) { 
embed.setDescription(`${u} was **deafed** (Server) `)
.setColor("#EFB666")

}
    if (oS.serverDeaf && !nS.serverDeaf) { embed.setDescription(`${u} was **undeafed** (Server) `)
.setColor("BLUE")


      
    }
    if (!oS.serverMute && nS.serverMute) {
embed.setDescription(`${u} was **muted** (Server) `).setColor("#EFB666")

}
    if (oS.serverMute && !nS.serverMute) {
embed.setDescription(`${u} was **unmuted** (Server) `).setColor("BLUE")

}


    if (!oS.selfDeaf && nS.selfDeaf) {
embed.setDescription(`${u} was **deafed** (Self) `).setColor("#EFB666")

}
    if (oS.selfDeaf && !nS.selfDeaf) {
embed.setDescription(`${u} was **undeafed** (Self) `).setColor("BLUE")

}
    if (!oS.selfMute && nS.selfMute) {
embed.setDescription(`${u} was **muted** (Self) `).setColor("#EFB666")

}
    if (oS.selfMute && !nS.selfMute) {
embed.setDescription(`${u} was **unmuted** (Self) `).setColor("BLUE")

}


    if (oS.sessionID != nS.sessionID) embed.setDescription(`${u} **Session ID** on ${nS.sessionID}`)
    .setColor("GREEN")
    if (!oS.selfVideo && nS.selfVideo) {
embed.setDescription(`${u} started **self video sharing** in ${nS.channel.toString()} (${nS.channel.id})`)
.setColor("BLUE")
}
    if (oS.selfVideo && !nS.selfVideo) {
embed.setDescription(`${u} stopped **self video sharing** in ${oS.channel.toString()} (${oS.channel.id})`)
.setColor("#EFB666")
}


    if (!oS.channelID && nS.channelID) {
embed.setDescription(`${u} joined ${nS.channel} (${nS.channel.id})`)
.setColor("BLUE")
}
    if (oS.channelID && !nS.channelID) {
 embed.setDescription(`${u} left ${oS.channel} (${oS.channel.id})`)
 .setColor("#EFB666")
}
    if (oS.channelID && nS.channelID && oS.channelID != nS.channelID) {
embed.setColor("GREEN")
embed.setDescription(`${u} **switched** from ${oS.channel.toString()} (${oS.channel.id}) to ${nS.channel.toString()} (${nS.channel.id})`)
}
return log.send({
username: "Smexy", 
avatarURL: " https://cdn.discordapp.com/emojis/815236313116573727.png", 
embeds: [embed]
})

}
}