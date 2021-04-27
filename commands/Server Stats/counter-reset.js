const { MessageEmbed } = require("discord.js") 
const Discord = require("discord.js") 
const db = require("quick.db")
module.exports = {
name: "reset", 
time: 30000,
aliases: [], 
async run(bot, message, args, prefix) {


const data = db.get(`stats_${message.guild.id}`);
      if(!data || data === null) { 
        return message.channel.send(`Server stats is not setup in this server yet.`)
      }
 
        try {
    //    message.guild.channels.cache.get(data).delete(`Server Stats System: ${message.author.tag} (${message.author.id})`)
 let msg = await message.channel.send(`<a:aIconLoading:814459630201208842> Please Wait !`)
db.all()
.filter(d => d.ID.startsWith(`stats_${message.guild.id}`))
.map(d => d.ID)
.forEach(async d => { 
 await message.guild.channels.cache.get(db.get(d)).delete(`Server Stats System: ${message.author.tag} \(${message.author.id}\)`)
  db.delete(d)

  
});
await msg.delete();

        return message.channel.send(`Server stats removed. Reset successful. Use \`${prefix}setup\` to re-setup again. `);
    } catch (error) {
        message.reply("ERROR: "+error)   
}
}
}

