
const Discord = require('discord.js');
const superagent = require('superagent')

module.exports = {
  name: "kiss", 
  aliases: [], 
  category: "nsfw", 
  nsfw: true, 
  description: "Shows random kiss image/gif.", 
  run: async(bot, message, args) => {
  
superagent.get('https://nekos.life/api/v2/img/kiss')
//superagent.get('https://nekobot.xyz/api/image?type=lewd') 
  
    .end((err, response) => {
  const embed = new Discord.MessageEmbed()
      .setTitle(":smirk: Kiss")
   .setImage(response.body.url)
      .setColor(`RANDOM`)
      .setFooter(`Tags: kiss`)
   .setURL(response.body.url);
  message.channel.send(embed)
    });
  
    
  }
  };