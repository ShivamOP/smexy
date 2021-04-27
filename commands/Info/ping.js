const discord = require('discord.js');

module.exports = {
  name: 'ping',
  description: 'Shows the bot ping and api ping.',
//  category: 'Info',
  aliases: ['pong'],
async run(bot, message, args, prefix, config)  {
    
    message.channel.send(`Pinging...`).then(m => {
      
      let ping = m.createdTimestamp - message.createdTimestamp;
      
      let embed = new discord.MessageEmbed()
      .setColor("RANDOM")
      .addField(`Ping`, `${ping}ms`, true)
      .addField(`API ping:`, `${bot.ws.ping}ms`, true); 
      
      m.edit(':ping_pong: **Pong!**', embed);
    })
  }
}