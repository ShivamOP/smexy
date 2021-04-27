const pagify = require("../../utils/page.js")
const {MessageEmbed} = require("discord.js")
module.exports = {
 name: "page", 
 run: async(bot, message, args) => {
 
   let pages = [
  new MessageEmbed().setTitle(1), 
  new MessageEmbed().setTitle(2), 
  new MessageEmbed().setTitle(3),
  new MessageEmbed().setTitle(4), 
     ]
 await pagify(message, 60000,pages) 
   
 }
}