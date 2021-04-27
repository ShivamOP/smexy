const Discord = require("discord.js")
const db = require("quick.db")
module.exports = {
  name: "messages",
  aliases: [], 
  async run(bot, message, args) {
    
    
   let user = message.mentions.users.first() || message.author
        let messages = db.fetch(`messages_${message.guild.id}_${user.id}`)
       if(messages === null) messages = 0;
       message.channel.send(new Discord.MessageEmbed()
      .setTitle("Messages") 
   .setDescription(`**${user.tag}** has \`${messages}\` messages.`) 
    .setColor('BLUE') 
    .setThumbnail(user.displayAvatarURL({dynamic: true}))
    ) 
        
  }
}