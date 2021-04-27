module.exports = {
  name: "leave-guild",
  description: "Leaves a guid by the provided Id/Name",
  aliases: ['leaveguild'], 
  owner: true, 
  userperms: [], 
  botperms: [], 
  async run(bot, message, args) {
  
    const guildId= args[0];
    if (!guildId) {
      return message.channel.send("Please provide a server id to leave.");
    }

    const guild = bot.guilds.cache.find((g) => g.id === args[0]) || bot.guilds.cache.find((g) => g.name.toLowerCase() === args.join(" ").toLowerCase());

    if (!guild) {
      return message.channel.send("That guild wasn't found.");
    }
const { confirmation } = require("@reconlx/discord.js");
const { MessageEmbed } = require('discord.js');
message.channel.send(guild.name, 
new MessageEmbed()
.setColor('#ffff00') 
.setFooter(`This message will expire in 30 seconds if not responded.`)
.setAuthor(`Are your sure that you want me to leave that guild?`) 
.setThumbnail(guild.iconURL({dynamic: true}))).then(async (msg) => {
  const emoji = await confirmation(msg, message.author, ["✅", "❌"], 30000);
  if (emoji === "✅") {
    msg.delete();
try {
      await guild.leave();
      message.channel.send(`Successfully left guild: **${guild.name}**`);
    } catch (e) {
      console.error(e);
      return message.channel.send("An error occurred leaving that guild");
    }
  }
  if (emoji === "❌") {
   
    msg.delete();
  }
    
})
  
  }
}