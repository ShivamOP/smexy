
const Discord = require('discord.js');
const superagent = require('superagent')

module.exports = {
  name: "lewd", 
  aliases: [], 
  category: "nsfw", 
  nsfw: true, 
  description: "Shows random lewd image.", 
  run: async(bot, message, args) => {
  
superagent.get('https://nekos.life/api/v2/img/lewd')
//superagent.get('https://nekobot.xyz/api/image?type=lewd') 
  
    .end((err, response) => {
  const embed = new Discord.MessageEmbed()
      .setTitle(":smirk: Lewd")
   .setImage(response.body.url)
      .setColor(`RANDOM`)
      .setFooter(`Tags: lewd`)
   .setURL(response.body.url);
  message.channel.send(embed)
    });
  
    
  }
  };