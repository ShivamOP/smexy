module.exports = {
  name: "invite", 
  desc: "Gives you the invite link of smexy bot.", 
  aliases: ["inv"], 
  async run(bot, message, args) {
    
    
    const { MessageEmbed } = require("discord.js")
    const embed = new MessageEmbed() 
    .setColor("RANDOM")
    .setAuthor("Smexy - Invite", "https://cdn.discordapp.com/emojis/815236313116573727.png")
    .setDescription(`
[Invite Link (Recommended)](https://discord.com/oauth2/authorize?client_id=799540871552434186&permissions=2147483647&scope=bot
)
[Invite Link (Only Admin)](https://discord.com/oauth2/authorize?client_id=799540871552434186&permissions=8&scope=bot
) 
   `) 
    message.channel.send(embed)
    
  }
}