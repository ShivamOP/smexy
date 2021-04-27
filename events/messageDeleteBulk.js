const dateFormat = require('dateformat');
const { MessageAttachment, MessageEmbed } = require('discord.js');

module.exports = async (bot, messages) => {
  
messages.array().reverse().forEach(async message => {
if(message.author)	await message.author.fetch().catch(err => {});
if(message.channel) await message.channel.fetch().catch(err => {});
if(message.guild) await	message.guild.fetch().catch(err => {});
  
})

		let humanLog = `**Deleted Messages from #${messages.first().channel.name} (${messages.first().channel.id}) in ${messages.first().guild.name} (${messages.first().guild.id})**\n\n`;
	humanLog += `\`\`\`If some messages are not visible or showing null or unknown. it means that messages are not cached/stored in the bot's cache. we cannot do nothing about this. discord sometimes doesn't allows the bot to see the deleted messages.
	\`\`\``
		for (const message of messages.array().reverse()) {

		
			humanLog += `\r\n\r\n[${dateFormat(message.createdAt, 'ddd dd/mm/yyyy HH:MM:ss')}] ${message.author ? message.author.tag : 'Unknown User'} (${message.id})`;
	//		humanLog += ' : ' + message.content;
			 humanLog += ' : '+ `${message.embeds.length ? (message.embeds[0].description || message.embeds[0].title || (message.embeds[0].footer ? message.embeds[0].footer.text : null) || (message.embeds[0].author ? message.embeds[0].author.text : null)) : message.content}`;
		}
		
		const modChannel = messages.first().channel.guild.channels.cache.find(c => c.name.toLowerCase().includes("ban") && c.type === "text");
// const modChannel = messages.first().channel.guild.channels.cacge.get(require("quick.db").get(`logs_${messages.first().channel.guild.id}`))
		if (modChannel) {
			const attachment = new MessageAttachment(Buffer.from(humanLog, 'utf-8'), 'DeletedMessages.txt');
			const msg = await modChannel.send(attachment);

			const embed = new MessageEmbed()
				.setDescription(`**${messages.size}** messages were deleted in ${messages.first().channel.toString()} (${messages.first().channel.id})`)
.setColor("GREEN") 
				.addField('Deleted Messages:', `[View](https://txt.discord.website/?txt=${modChannel.id}/${msg.attachments.first().id}/DeletedMessages)`, true)
				.setTimestamp();
			modChannel.send(embed);
		}


	}
