let Discord = require("discord.js")
let ms = require("ms")
module.exports = {
name: "mute", 
async run(bot, message, args, prefix) {

if(!message.member.hasPermission('MANAGE_ROLES')) return message.reply("You don't have permission enough permissions. `MANAGE_ROLES`.");
if(!message.guild.me.hasPermission('MANAGE_ROLES')) return message.reply("I don't have permission enough permissions. `MANAGE_ROLES`.");

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) ;
   if(!user) return message.reply("User not found");
  if(user.id === message.author.id) return message.reply("You cannot mute yourself.");
if(user.id === bot.user.id) return message.channel.send("I can't mute myself.")
if(user.roles.highest.position >= message.guild.me.roles.highest.position) return message.reply("I can't mute that user")

  if(user.roles.highest.position >= message.member.roles.highest.position) return message.reply("You can't mute that user")

  
    let muteRole = message.guild.roles.cache.find(n => n.name.toLowerCase() === 'muted')
    if(!muteRole) { 
muteRole = await message.guild.roles.create({
data: {
  color: "#ff0000", 
name: 'Muted',
permissions: []
}
   }) 
}
user.roles.add(muteRole).catch((err) => {
let embed8 = new Discord.MessageEmbed()
  .setColor('#F80000')
  .setTitle(`**Error**`)
  .setDescription(`Error: ${err.message}`)
  .setTimestamp()
  return message.channel.send(embed8)
    })
   
 if(!args[1] || !ms(args[1])) {
    let embed7 = new Discord.MessageEmbed()
    .setColor('#F80000')
    .setAuthor(user.user.tag, user.user.displayAvatarURL({dynamic:true}))
    .setDescription(`${user} has been muted.`) 
    .setTimestamp()
    message.channel.send(embed7)

} else if(args[1] && ms(args[1])) {
  let embed7 = new Discord.MessageEmbed()
    .setColor('#F80000')
    .setAuthor(user.user.tag, user.user.displayAvatarURL({dynamic:true}))
    .setDescription(`${user.user.username} Muted :zipper_mouth: Time: ${args[1]}`) 
    .setTimestamp()
    message.channel.send(embed7)
setTimeout(() => {
        user.roles.remove(muteRole);
      }, ms(args[1]));
}


  
  

  
       
    
}
}