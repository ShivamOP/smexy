
const discordiscord = require('discord.js');
const superagent = require('superagent')

module.exports = {
  name: "thigh", 
  aliases: [], 
  category: "nsfw", 
  nsfw: true, 
  description: "Shows random thigh image.",
  run : async(bot, message, args) => {
  
//superagent.get('https://nekos.life/api/v2/img/thigh')
superagent.get('https://nekobot.xyz/api/image?type=thigh') 
    .end((err, response) => {
  const embed = new Discord.MessageEmbed()
      .setTitle(":smirk: Thigh") 
 .setImage(response.body.message)
      .setColor(`RANDOM`)
      .setFooter(`Tags: thigh`)
  .setURL(response.body.message);
  message.channel.send(embed)
    });
  
    
  }
  };