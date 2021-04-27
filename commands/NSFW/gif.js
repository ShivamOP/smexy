
const Discord = require('discord.js');
const superagent = require('superagent')

module.exports = {
  name: "porn", 
  aliases: [], 
  category: "nsfw", 
  nsfw: true, 
  description: "Shows random porn gif.",
  run : async(bot, message, args) => {
  
 //superagent.get('https://nekos.life/api/v2/img/pgif')
superagent.get('https://nekobot.xyz/api/image?type=pgif') 
    .end((err, response) => {
  const embed = new Discord.MessageEmbed()
      .setTitle(":smirk: porn") 
  .setImage(response.body.message) 
      .setColor(`RANDOM`)
      .setFooter(`Tags: porn`)
      .setURL(response.body.message);
  message.channel.send(embed)
    });
  
    
  }
  };