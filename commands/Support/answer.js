const Discord = require('discord.js');
const bot = new Discord.Client();
module.exports = {
    name: "answer",
    desc: "Shows a list of cmds or info about a specific command.",
    owner: true, 
    aliases: [],
        async run(bot, message, args, prefix) {
          
        
   
    const target = args.shift();
    const sayMessage = args.join(" ")
    if(!sayMessage) return message.reply(`Usage: \`${prefix}answer <userID/@user/username> <message/answer>\``)
    
let owner = message.author;
   let contact = new Discord.MessageEmbed()
let userxd = message.mentions.users.first() || bot.users.cache.get(target) || bot.users.cache.find(u => u.username.toLowerCase() === target.toLowerCase());
if(!userxd) return message.reply("Unknown User.");

 contact.setThumbnail(userxd.displayAvatarURL({dynamic: true}))
 
   .setColor("RANDOM")

   .setTitle("Response from your contact!")
   .setDescription(sayMessage)
   .addField("Support Server", "[SMEXY BOT OFFICIAL](https://discord.gg/CaCTEJkfZA)")
   .setTimestamp()

    userxd.send("**"+userxd.tag+"**",contact).catch(err => { return message.channel.send(`**${userxd.tag}**'s DMs are off. \`${err}\|`)}
        ) 

    let chanemb = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setDescription(sayMessage)
    .setThumbnail(userxd.displayAvatarURL({dynamic:true}))
    message.channel.send(`✅ **|** ${userxd.tag}`, chanemb).then(msg => msg.delete({ timeout: 5000 }));


        message.delete();

      }
}

      