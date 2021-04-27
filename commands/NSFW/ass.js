
const Discord = require('discord.js');
const superagent = require('superagent')

module.exports = {
  name: "ass", 
  aliases: [], 
  category: "nsfw", 
  nsfw: true, 
  description: "Shows random ass image.",
  run : async(bot, message, args) => {
  
//superagent.get('https://nekos.life/api/v2/img/ass')
     superagent.get('https://nekobot.xyz/api/image?type=ass') 
    .end((err, response) => {
  const embed = new Discord.MessageEmbed()
      .setTitle(":smirk: Ass") 
      .setImage(response.body.message)
      .setColor(`RANDOM`)
      .setFooter(`Tags: ass`)
      .setURL(response.body.message);
  message.channel.send(embed)
    });
  
    
  }
  };