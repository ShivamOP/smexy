const Discord = require('discord.js');
const bot = new Discord.Client();

const channel = "801299559463911464"
const fs = require('fs');
module.exports = async(bot,guild)=>{

   const db = require("quick.db")
   db.delete(guild.id);
  let data = db.all().filter(x => x.ID.includes(guild.id));
   if(data || data.length) {
     data.forEach(data => {
  db.delete(data.ID) 
   }) 
   }

    let embed = new Discord.MessageEmbed()
    .setColor(`0x#ff0000`)
 // .setURL(`https://discord.gg/${inv}`)
    .setFooter(`I Am In ${bot.guilds.cache.size} Servers Now !`)
    .setTitle(`<a:smexy_leave:804215711857246219> Left A Server !`)
    .setThumbnail(guild.iconURL({dynamic: true}))
    .setDescription(`**Server Name**: ${guild.name}\n**Server ID**: ${guild.id}\n**Members**: ${guild.memberCount}\n**Owner**: ${guild.owner}\n**Owner ID**: ${guild.ownerID}`)
    .setTimestamp();
    bot.channels.cache.get('801299559463911464').send(embed)
    
}