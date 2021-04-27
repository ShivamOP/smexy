const Discord = require('discord.js');
const bot = new Discord.Client();
const db = require('quick.db')
module.exports = {
    name: "enablelevelling",
    desc: "Shows a list of cmds or info about a specific command.",
    aliases: ['enable-levelling'],
        async run(bot, message, args) {
const { confirmation } = require('reconlx')
const embed = new Discord.MessageEmbed() 
.setColor('0x#ffff00') 
.setAuthor(`Are you sure that you want to enable levelling? `) 
.setFooter(`This message will expire in 30 seconds if not responded.`)
 message.channel.send(embed).then(async msg => {
const emoji = await confirmation(msg, message.author, ['✅', '❌'], 10000)
  if(emoji === '✅') {
    msg.delete()
const embedd = new Discord.MessageEmbed() 
.setColor('0x#ffff00') 
.setDescription(`<:smexy_tick:804566051148267531> Levelling has been enabled!`) 
message.channel.send(embedd)
db.set(`${message.guild.id}-levelling`, `on`) 
  } 
  if(emoji === '❌') { 
    msg.delete()
  }
}) 
}
}