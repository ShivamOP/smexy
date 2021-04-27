
module.exports = {
 name: "test", 
 async run(bot, message, args, prefix) {
   
   
   const {MessageEmbed} = require("discord.js");
   const { page } = require("../../utils/page.js");
   const embed = new MessageEmbed()
   .setTitle("PAGE 1"), 
   embed1 = new MessageEmbed()
   .setTitle("Page 2"), 
   embed2 = new MessageEmbed()
   .setTitle("Page 3")
  embed3 = new MessageEmbed()
   .setTitle("Page 4"), 
   embed4 = new MessageEmbed()
   .setTitle("Page 5");
  
   page(message, 60000, [
     embed, embed1, embed2, embed3, embed4]
     )
   
   
 }
  
}