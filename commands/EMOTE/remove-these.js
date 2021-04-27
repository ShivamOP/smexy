const Discord = require('discord.js');
const { parse } = require("twemoji-parser");
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: 'remove-these',
aliases: ['removethese','delete-emoji','del-emoji','delemoji', 'deleteemoji'], 
   async run(bot, message, args) {
        if(!message.member.hasPermission("MANAGE_EMOJIS")) {
return message.channel.send(`:x: | **You Don't Have Permission To Use This Command**`)
}
if(!message.guild.me.hasPermission("MANAGE_EMOJIS")) {
return message.channel.send(`:x: | **I Don't Have Permission To Manage Emojis.**`)
}
        const emojis = args.join(" ").match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi)
        if (!emojis) return message.channel.send(`**Please provide the emojis to remove**`);
        
     
        const msg = await message.channel.send(`<a:aIconLoading:814459630201208842> Please Wait!`);
       
        emojis.forEach(async emote => {
        let emoji = Discord.Util.parseEmoji(emote);
        if (emoji.id) {

   let name;
   let em;

     
    try {
   
   try { 
 name = await message.guild.emojis.cache.get(emoji.id).name;
 em = await message.guild.emojis.cache.get(emoji.id).delete().catch(err => { return message.channel.send(`An error occurred: \`${err}\``)})
   } catch(e) {
     message.channel.send(`An error occured: \`${e}\``)
   }
            
             msg.delete();
              message.react('✅') ; message.channel.send(`Removed the \`${name}\` emoji`).catch(error => {
              message.channel.send(`An error occurred: \`${error}\``)
                console.log(error)
})
      
    } catch (e) {
    message.channel.send(`An error occurred: \`${e}\``)
    } 
    }
   
    
        })
       
     
   }
}