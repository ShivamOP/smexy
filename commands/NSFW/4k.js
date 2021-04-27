
const Discord = require('discord.js');
const superagent = require('superagent')

module.exports = {
  name: "4k", 
  aliases: [], 
  category: "nsfw", 
  nsfw: true, 
  description: "Shows random 4k image.",
  run : async(bot, message, args) => {
superagent.get('https://nekobot.xyz/api/image?type=4k') 
    .end((err, response) => {
  const embed = new Discord.MessageEmbed()
      .setTitle(":smirk: 4k") 
      .setImage(response.body.message)
      .setColor(`RANDOM`)
      .setFooter(`Tags: 4k`)
      .setURL(response.body.message);
  message.channel.send(embed)
    });
  
    
  }
  };