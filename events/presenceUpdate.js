module.exports = async(bot, oldPresence, newPresence) => {
/* let old = oldPresence;
let New = newPresence;
if(old.member.user.bot) return;
const { MessageEmbed } = require("discord.js");
const guild = old.guild;
 if (!guild.me.hasPermission("MANAGE_WEBHOOKS")) return;
    const w = await guild.fetchWebhooks();
    const log = w.find((w) => w.name === "Smexy Logger");
if(log) {

const embed = new MessageEmbed() 
 .setColor("BLUE") 
.setTimestamp() 
.setFooter(`User ID: ${New.user.id}`) 
.setAuthor(New.member.user.tag, New.member.user.displayAvatarURL({dynamuc: true}))
.setDescription(`${New.member.toString()} updated their **presence** (Status/Activity)`)

if((old.status != New.status) || (!old.status && New.status) || (old.status && !New.status)) {
embed
.addField(`❯ Old Status`, old.status.charAt(0).toUpperCase()+old.status.slice(1))
.addField(`❯ New Status`, New.status.charAt(0).toUpperCase()+New.status.slice(1)) 
}

let act = old.activites;
let Act = New.activites;
if((act && act[0]) || (Act && Act[0])) {
if((act[0].type != Act[0].type) || (act[0].toString() != Act[0].toString()) || (!act.length && Act.length ) || (act.length && !Act.length)) {
embed
.addField(`❯ Old Activity`, `(Type: ${act[0].type})\n${act[0].toString()}`) 
.addField(`❯ New Activity`, `(Type: ${Act[0].type})\n${Act[0].toString()}`)  
}
}
return log.send({
username: "Smexy", 
avatarURL: " https://cdn.discordapp.com/emojis/815236313116573727.png", 
embeds: [embed]
})

} */
}