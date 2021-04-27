const Discord = require('discord.js');

module.exports = {
    name: "rank",
    aliases: ['level', 'xp'],
        async run(bot, message, args, prefix) {
const Levels = bot.levels;
const levels = bot.levels;
let canvacord = require("canvacord");
let embedColor = "#ffffff", 
embedcolor = embedColor;
let rankuser = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
                if (!rankuser) return message.reply("User not found.");
                if(rankuser.bot) return message.reply("Bots are not ranked.");
       const user = await Levels.fetch(rankuser.user.id, message.guild.id, true);
       if(!user) return message.channel.send(`${rankuser} is not ranked yet.`)
     let xp = user.xp;
let XP = levels.xpFor(Number(user.level + 1));
                const rank = new canvacord.Rank()
                    .setAvatar(rankuser.user.displayAvatarURL({
                        dynamic: false,
                        format: 'png'
                    }))
                    .setCurrentXP(Number(xp), embedColor)
// .setOverlay() 
// .setBackground()
                    .setRequiredXP(Number(XP), embedcolor)
                    .setStatus("online", true, 5)
                    .renderEmojis(true)
                    .setProgressBar(embedColor, "COLOR")
//.setProgressBarTrack(embedColor, "COLOR") 
                    .setRankColor(embedcolor, "COLOR")
                    .setLevelColor(embedcolor, "COLOR")
                    .setUsername(rankuser.user.username, embedcolor)
                    .setRank(Number(user.position), "Rank", true)
                    .setLevel(Number(user.level), true)
                    .setDiscriminator(rankuser.user.discriminator, embedcolor);
         const data = await rank.build();
           
                 
                        const attachment = new Discord.MessageAttachment(data, "Rank.png");
              
   const e = {
    rank: bot.emojis.cache.find(e => e.name === "smexy_rank").toString(), 
    xp: bot.emojis.cache.find(e => e.name === "smexy_xp").toString(), 
    level: bot.emojis.cache.find(e => e.name === "smexy_level").toString()
  }
 
   
                        const embed = new Discord.MessageEmbed()			
.setDescription(`
${e.rank} **|** **Rank:** \`#${user.position}\`
${e.level} **|** **Level:** \`${user.level}\`
${e.xp} **|** **XP:** \`${user.xp} / ${XP}\`
		`)


                            .setAuthor(rankuser.user.tag, rankuser.user.displayAvatarURL({dynamic: true})) 
                            .setThumbnail(message.guild.iconURL({dynamic: true}))
                            .setColor(embedColor)
                            .setImage("attachment://Rank.png")
                            .attachFiles(attachment)
      
                        message.channel.send(embed);
                        
                    
     
          
          
        }
}


