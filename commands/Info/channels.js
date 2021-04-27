      
  const { MessageEmbed } = require("discord.js") 
const Discord = require("discord.js") 

module.exports = {
name: 'channels', 
aliases: ["channels-list"], 
async run(bot, message, args) {

// CATEGORY CHANNELS
let cat = message.guild.channels.cache.array().filter(c => c.type === 'category').sort((b,a) => b.position - a.position).map(c => c).join(" **|** ");
if(cat.length > 1024) cat = message.guild.channels.cache.array().filter(c => c.type === 'category').sort((b,a) => b.position - a.position).map(c => c).join(" **|** ").slice(0, 1024) + " .......... Too many category channels to show.";

// TEXT CHANNELS 
let text = message.guild.channels.cache.array().filter(c => c.type !== 'category' && c.type !== 'voice').sort((b,a) => b.position - a.position).map(c => c).join(" **|** ");
if(text.length > 1024) text = message.guild.channels.cache.array().filter(c => c.type !== 'category' && c.type !== 'voice').sort((b,a) => b.position - a.position).map(c => c).join(" **|** ").slice(0, 1024) + " .......... Too many text channels to show.";
let voice = message.guild.channels.cache.array().filter(c => c.type === 'voice').sort((b,a) => b.position - a.position).map(c => `${c}`).join(" **|** ");
if(voice.length > 1024) voice = message.guild.channels.cache.array().filter(c => c.type === 'voice').sort((b,a) => b.position - a.position).map(c => `${c}`).join(" **|** ").slice(0, 1024) + " .......... Too many voice channels to show.";
    const e = [
             "◀",
             "▶"
             ]
const embed = new MessageEmbed() 
.setColor("RANDOM") 
.setTitle(`Channels List of ${message.guild.name}`) 
.setThumbnail(message.guild.iconURL({dynamic: true})) 
.setDescription([
`This is the navigation page`, 
`\n`, 
`Page 1 = Category Channels`, 
`Page 2 = Text Channels`, 
`Page 3 = Voice Channels`, 
`\n`, 
`Use ${e[0]+e[1]} emojis to navigate.`, 
`\n`, 
`**Total Channels:** ${message.guild.channels.cache.size}`,
])
.setTimestamp()

.setFooter(`Total Channels: ${message.guild.channels.cache.size}`) 
    const embed1 = new MessageEmbed() 
.setTitle(`Category Channels [${message.guild.channels.cache.filter(c => c.type === 'category').size}]`) 
.setDescription(cat || "None") 
.setColor("RANDOM") 
.setTimestamp() 

const embed2 = new MessageEmbed()
.setTitle(`Text Channels [${message.guild.channels.cache.filter(c => c.type !== 'category' && c.type !== 'voice').size}]`) 
.setDescription(text || "None") 
.setColor("RANDOM") 
.setTimestamp() 

const embed3 = new MessageEmbed()
.setTitle(`Voice Channels [${message.guild.channels.cache.filter(c => c.type === 'voice').size}]`) 
.setDescription(voice || "None") 
.setTimestamp() 
.setColor("RANDOM") 

 const pagination = require('discord.js-pagination');    
  const pages = [
                    embed,
                   embed1, 
embed2, 
embed3, 
            ]
    
            const emojiList = [
             "◀",
             "▶"
              
              ]
              const timeout = '120000';
    
            pagination(message, pages, emojiList, timeout)
   


}
}