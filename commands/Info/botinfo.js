
const { MessageEmbed, version: djsversion } = require('discord.js')
const { version } = require('../../package.json')
const { utc } = require('moment')
const os = require('os')
const ms = require('ms')
const Fsf = require("file-bytes-formatter")
 
module.exports = {
name: "botinfo", 
aliases: ["about","bot-info" , "stats"], 
async run(bot, message, args) {
		const core = os.cpus()[0]
	let roles = 0;
bot.guilds.cache.forEach(g => roles += g.roles.cache.size) 
		const embed = new MessageEmbed()
			.setThumbnail(bot.user.displayAvatarURL())
			.setColor(message.guild.me.displayHexColor || 'RANDOM')
			.addField('General', [
				`**❯ Client:** ${bot.user.tag}`,
`**❯ ID:** ${bot.user.id}`,
`**❯ Owner:** [*₊⋆ˋ ❥ ! S h i V a M _🍷 † ](https://discord.bio/p/shivamop)`,
				`**❯ Commands:** ${bot.commands.size}`,
				`**❯ Servers:** ${bot.guilds.cache.size.toLocaleString()} `,
				`**❯ Users:** ${bot.guilds.cache
					.reduce((a, b) => a + b.memberCount, 0)
					.toLocaleString()}`,
				`**❯ Channels:** ${bot.channels.cache.size.toLocaleString()}`,
				`**❯ Roles:** ${roles.toLocaleString()}`,
				`**❯ Emojis:** ${bot.emojis.cache.size.toLocaleString()}`, 
				`**❯ Creation Date:** ${utc(bot.user.createdTimestamp).format(
					'Do MMMM YYYY HH:mm:ss'
				)}`,
				`**❯ Bot Version:** v${version}`,
	`**❯ Node.js Version:** ${process.version}`,
				`**❯ Discord.js Version:** v${djsversion}`,
				'\u200b',
			])
			.addField('System', [
				`**❯ Platform:** ${process.platform}`,
				`**❯ Uptime:** ${ms(os.uptime() * 1000, { long: true })}`,
				`**❯ CPU:**`,
				`\u3000 Cores: ${os.cpus().length}`,
				`\u3000 Model: ${core.model}`,
				`\u3000 Speed: ${core.speed}MHz`, 
				`**❯ Memory:**`,
				`\u3000 Total: ${Fsf(
					process.memoryUsage().heapTotal
				)}`,
				`\u3000 Used: ${Fsf(
					process.memoryUsage().heapUsed
				)}`,
			])
			.setTimestamp()
.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
		message.channel.send(`<:smexy_icon:815236313116573727> **Information About Smexy** <:smexy_icon:815236313116573727>`,embed)
	}
}