

const Discord = require('discord.js');

module.exports = async(bot, message)=>{
  if(!message.author) return;
if(message.author && message.author.bot) return;
  if(!message.guild) return;
      bot.snipes.set(message.channel.id, {
        content: message.embeds.length ? message.embeds[0].description : message.content,
        author: message.author ? message.author.tag : null,
        time: new Date(), 
        member: message.member,
        footer: "DELETED",
        image: message.attachments.first() ? message.attachments.first().proxyURL : null
      });
    
const { MessageEmbed } = require("discord.js");
const modLog = message.guild.channels.cache.get(require("quick.db").get(`logs_${message.guild.id}`));
if(modLog && modLog.viewable && modLog.permissionsFor(message.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])
  ) {
	const fetchedLogs = await message.guild.fetchAuditLogs({
		limit: 1,
		type: 'MESSAGE_DELETE',
	});
	const deletionLog = fetchedLogs.entries.first();
	if (deletionLog) {
	const { executor, target } = deletionLog;
	if (target.id === message.author.id) {
const embed = new MessageEmbed() 
.setColor("RED") 
.setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true})) .setImage(message.attachments.first() ? message.attachments.first().proxyURL : null) 
.setTimestamp() 
.setFooter(`Message ID: ${message.id}`)
.setDescription(`Message deleted in ${message.channel.toString()} (${message.channel.id}) by ${executor.toString()} (${executor.id})`)
.addField(`❯ Message Content`, (message.content.length > 1024) ? message.content.slice(0, 1021) : message.content )
if(message.attachments.first()) { embed.addField(`❯ Message Attachments URL`, message.attachments.map(img => img.proxyURL ).join("\n"))
}
modLog.send(embed)
	} else {
const embed = new MessageEmbed() 
.setColor("RED") 
.setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true})) 
.setTimestamp() .setImage(message.attachments.first() ? message.attachments.first().proxyURL : null) 
.setFooter(`Message ID: ${message.id}`)
.setDescription(`Message deleted in ${message.channel.toString()} (${message.channel.id})`)
.addField(`❯ Message Content`, (message.content.length > 1024) ? message.content.slice(0, 1021) : message.content )
if(message.attachments.first()) { embed.addField(`❯ Message Attachments URL`, message.attachments.map(img => img.proxyURL ).join("\n"))
}
modLog.send(embed)
	} 
	} else {
const embed = new MessageEmbed() 
.setColor("RED") 
.setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true})) 
.setTimestamp() 
.setFooter(`Message ID: ${message.id}`)
.setDescription(`Message deleted in ${message.channel.toString()} (${message.channel.id})`)
.setImage(message.attachments.first() ? message.attachments.first().proxyURL : null) 
.addField(`❯ Message Content`, (message.content.length > 1024) ? message.content.slice(0, 1021) : message.content )
if(message.attachments.first()) { embed.addField(`❯ Message Attachments URL`, message.attachments.map(img => img.proxyURL ).join("\n"))
}
modLog.send(embed)
}


}

}
