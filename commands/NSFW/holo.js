
const Discord = require('discord.js');
const superagent = require('superagent')

module.exports = {
  name: "holo", 
  aliases: [], 
  category: "nsfw", 
  nsfw: true, 
  description: "Shows random holo image.",
  run : async(bot, message, args) => {
//superagent.get('https://nekos.life/api/v2/img/holo')
superagent.get('https://nekobot.xyz/api/image?type=holo') 
 
    .end((err, response) => {
  const embed = new Discord.MessageEmbed()
      .setTitle(":smirk: Holo") 
.setImage(response.body.message)
      .setColor(`RANDOM`)
      .setFooter(`Tags: holo`)
 .setURL(response.body.message);
  message.channel.send(embed)
    });
  
    
  }
  }