const Discord = require('discord.js');
const bot = new Discord.Client();
module.exports = {
    name: "snipe",
    desc: "Shows the recently deleted or edited message in the channel.",
    aliases: [],
            async run(bot, message, args) {
    const msg = bot.snipes.get(message.channel.id) 
   if(msg){ const embed = new Discord.MessageEmbed() 
    .setAuthor(msg.author, msg.member.user.displayAvatarURL({dynamic: true})) 
    .setDescription(msg.content) 
                .setFooter(msg.footer) 
                .setTimestamp(msg.time)
           if(msg.image) embed.setImage(msg.image);
                message.channel.send(embed);
               
   
            } else {
                const embed1 = new Discord.MessageEmbed() 
   .setDescription(`There is nothing to snipe.`) 
    .setColor('RANDOM');
               message.channel.send(embed1)
        
            }
       
        }
    }