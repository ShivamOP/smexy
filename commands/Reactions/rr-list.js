


module.exports = {
 name: "rr-list", 
 aliases: [],botPerms: ["MANAGE_ROLES"], 
 userPerms: ["MANAGE_ROLES"], 

 description: "Shows list of all reaction roles.", 
 run: async(bot, message, args, prefix) => {
   
  let count = 1;
   const db = require("quick.db")
   const { MessageEmbed } = require("discord.js");
   const hehe = db.all().filter(data => data.ID.startsWith(`reactions_${message.guild.id}`)) 
   if(!hehe || !hehe.length) return message.channel.send("There are no reaction roles set on this server.")
   const data = []
   hehe.forEach(x => {
     
       let simple = [];
   let r = x.data;
   r.forEach(xxx => {
 count++
 simple.push(`Emoji: ${bot.emojis.cache.get(xxx.emoji.id) ? bot.emojis.cache.get(xxx.emoji.id).toString() : xxx.emoji.toString() }\nRole: ${message.guild.roles.cache.get(xxx.roleId) ? message.guild.roles.cache.get(xxx.roleId).toString() : "Unknown Role"}`)
 })
  data.push([
    x.ID.split("_")[2], 
    simple.join("\n\n")
    ])
   })

  
     const embed = new MessageEmbed()
   .setColor("RANDOM")
   .setTitle("Reaction Roles list of "+message.guild.name)
   .setThumbnail(message.guild.iconURL({dynamic:true}))
 //  .addFields(rr)
  
 
   let index = 1;
const rr = [];
data.forEach(react => {
 
 embed.addField(`**${index++}**. Message ID - ${react[0]}`, react[1])
})
embed.setFooter(`Total Reaction Roles: ${count - 1}`)
await message.channel.send(embed)
// console.log(data)
 /* const rr = [];
  final.forEach(r => {
    rr.push({ name :`Message: `, value: `Emoji: ${r[0]}, Role: ${r[1]}`})
    
  }) */

 }
  
}
