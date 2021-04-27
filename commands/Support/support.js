module.exports = {
  name: "support", 
  desc: "Gives you the invite link of smexy's support server.", 
  aliases: [], 
  async run(bot, message, args) {
    
    
    const { MessageEmbed } = require("discord.js")
    const embed = new MessageEmbed() 
    .setColor("RANDOM")
    .setAuthor("Smexy - Support Server Invite", "https://cdn.discordapp.com/emojis/815236313116573727.png")
    .setDescription(`
   Click [here](https://discord.gg/CaCTEJkfZA) to join my support server.
    `)
    message.channel.send(embed)
    
  }
}