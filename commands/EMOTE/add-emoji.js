const Discord = require('discord.js');

const bot = new Discord.Client();

module.exports = {
    name: "add-emoji",
    desc: "Adds the provided emoji in the server",
    userPerms: ["MANAGE_EMOJIS"], 
    botPerms: ["MANAGE_EMOJIS"],  usage: '[ emoji | url | attachment ]', 
    aliases: ['ae','addemoji'],
        async run(bot, message, args) {
    if (!message.member.hasPermission("MANAGE_EMOJIS")) {
return message.channel.send(`:x: | **You Don't Have Permission To Manage Emojis**`)
}
 if (!message.guild.me.hasPermission("MANAGE_EMOJIS")) {
return message.channel.send(`:x: | **I Don't Have Permission To Manage Emojis. **`)
}
if(!args[0]) return message.channel.send(`Please send a valid emoji.`)
 const config = [100, 200, 300, 500];
      const tcount = config[message.guild.premiumTier];
     const count = message.guild.emojis.cache.size;
     const normal = message.guild.emojis.cache.filter(e => !e.aniamted)
     const animated = message.guild.emojis.cache.filter(e => e.animated)
     
     if(count >= tcount) { return message.channel.send(`Error: \`Maximum number of emojis reached ${count}\``)
   }
   /* if((tcount / 2) <= normal) { return message.channel.send(`Error: \`Maximum number of normal emojis reached ${normal}\``);
   }
     if((tcount / 2) <= animated) { return message.channel.send(`Error: \`Maximum number of animted emojis reached ${animated}\``);
     } */
     
let isUrl = require("is-url");
let type = "";
let name = "";
let emote = args.join(" ").match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi);
if (emote) {
  emote = emote[0];
  type = "emoji";
  name = args.join(" ").replace(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi, "").trim().split(" ")[0];
  
} else  {
  emote = `${args.find(arg => isUrl(arg))}`
  name = args.find(arg => arg != emote);
  type = "url";
}
let emoji = { name: "" };
      let Link;
      if (type == "emoji") {
        emoji = Discord.Util.parseEmoji(emote);
        if(!emoji.animated && (tcount / 2) >= normal) return message.channel.send(`Error: \`Maximum number of static emojis reached ${tcount / 2}\``)
     if(emoji.animated && (tcount / 2) >= animated) return message.channel.send(`Error: \`Maximum number of animted emojis reached ${tcount / 2}\``)
      Link = `https://cdn.discordapp.com/emojis/${emoji.id}.${
       emoji.animated ? "gif" : "png"
}`
} else { 
  if (!name) return message.channel.send("Please provide a name!");
if(name.length > 32) return message.channel.send(`Error: \`The emoji name cannot be of more than 32 length. Please provide a emoji name of less than 32 characters.\``);

  Link = message.attachments.first() ? message.attachments.first().proxyURL : emote;  }
            message.guild.emojis.create(Link , name.split(" ").join("_")|| emoji.name.split(" ").join("_")).then(em => message.channel.send(`${em} Added emoji with name \`${em.name}\``)).catch(error => {
              message.channel.send(`An error occurred: \`${error}\``)
                console.log(error)
})

}
}