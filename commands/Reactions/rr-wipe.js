


module.exports = {
 name: "rr-wipe", 
 aliases: [], 
 botPerms: ["MANAGE_ROLES"], 
 userPerms: ["MANAGE_ROLES"], 
 description: "Delete all reaction roles from the server.", 
 run: async(bot, message, args, prefix) => {
   
  
   const db = require("quick.db")
   const { MessageEmbed } = require("discord.js");
let count = 1;
   const hehe = db.all().filter(data => data.ID.startsWith(`reactions_${message.guild.id}`)) 
   if(!hehe || !hehe.length) return message.channel.send("There are no reaction roles set on this server.")
 
   hehe.forEach(x => {
x.data.forEach(r => {
count++
}) 
db.delete(x.ID);
})
     message.channel.send("Successfully deleted "+`**${count - 1}**`+" reaction roles from the server.");
       }
  
}
