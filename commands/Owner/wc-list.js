const Discord = require('discord.js');
const db = require('../../models/global-chat');
const bot = new Discord.Client();

module.exports = {
    name: "wc-channels-list",
    owner: true, 
    userperms: [], 
    botperms: [], 
    desc: "Shows a list of all the internation channels of the bot.",
    aliases: ['worldchat-channels-list', 'globalchat-channels-list', 'int-channels-list'],
        async run(bot, message, args) {
    
      db.find({ Activated: true}, async (err, data) => {
if(!data) return;
if(err) return console.error(err);
const map = [];

data.forEach(async d => {
  map.push(`\- ${bot.channels.cache.get(d.Channel) ? bot.channels.cache.get(d.Channel).toString() : "Unknown Channel"} In **${bot.guilds.cache.get(d.Guild) ? bot.guilds.cache.get(d.Guild).name : "Unknown Guild"}**`)})
const embed = new Discord.MessageEmbed() 
.setColor('BLUE') 
.setTitle('List of International Chat Channels !') 
.setDescription(map.join("\n"))
.setTimestamp();
message.channel.send(embed) 

});
}



        
}
