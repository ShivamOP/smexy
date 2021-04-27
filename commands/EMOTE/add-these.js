const Discord = require('discord.js');
const { parse } = require("twemoji-parser");
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: 'add-these',
aliases: ['addthese','create-emoji','createemoji'], 
   async run(bot, message, args) {
        if(!message.member.hasPermission("MANAGE_EMOJIS")) {
return message.channel.send(`:x: | **You Don't Have Permission To Use This Command**`)
}
if(!message.guild.me.hasPermission("MANAGE_EMOJIS")) {
return message.channel.send(`:x: | **I Don't Have Permission To Manage Emojis.**`)
}
        const emojis = args.join(" ").match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi)
        if (!emojis) return message.channel.send(`**Please provide the emojis to add**`);
        
      const config = [100, 200, 300, 500];
      const tcount = config[message.guild.premiumTier];
     const count = message.guild.emojis.cache.size;
     const static = message.guild.emojis.cache.filter(e => !e.aniamted)
     const animated = message.guild.emojis.cache.filter(e => e.animated)
     
     if(count >= tcount) return message.channel.send(`Error: \`Maximum number of emojis reached ${tcount}\``)

        const msg = await message.channel.send(`<a:aIconLoading:814459630201208842> Please Wait!`);
       
        emojis.forEach(async emote => {
        let emoji = Discord.Util.parseEmoji(emote);
        if (emoji.id) {


    if((!emoji.animated && (Math.floor(tcount / 2) >= static)) || (!emoji.animated && (tcount / 2) >= (emojis.length + static)
)) return message.channel.send(`Error: \`Maximum number of static emojis reached ${tcount / 2}\``)  
     if((emoji.animated && (Math.floor(tcount / 2) >= animated)) || (emoji.animated && (tcount / 2) >= (emojis.length + animated)
))return message.channel.send(`Error: \`Maximum number of animted emojis reached ${tcount / 2}\``)
     
let em;
      const Link = `https://cdn.discordapp.com/emojis/${emoji.id}.${
       emoji.animated ? "gif" : "png"
}`
    try {
   em = "undefined"; 
   try { em = await message.guild.emojis.create(
                `${Link}`,
                `${emoji.name}`
            ).catch(err => { return message.channel.send(`An errr occurred: \`${err}\``)})
   } catch(e) {
     message.channel.send(`An erro occured: \`${e}\``)
   }
            
            if(!em || em === null || em === "undefined") return;
if(em) {
             msg.delete();
              message.react('✅') ; message.channel.send(`${em} Added with name \`${em.name}\``).catch(error => {
              message.channel.send(`An error occurred: \`${error}\``)
                console.log(error)
})
}      
      
    } catch (e) {
    message.channel.send(`An error occurred: \`${e}\``)
    } 
    }
   
    
        })
       
     
   }
}