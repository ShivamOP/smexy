const { MessageEmbed } = require("discord.js")
module.exports = async(bot, error) => {
    
console.error(error);
const xd = bot.channels.cache.get("822027066609631253")
xd.send(`An error occured **|** ${xd.guild.owner.toString()}`, new MessageEmbed() 
.setColor("RED")
.setDescription("\`\`\`"+`${error.message ? (`${error} \n\n ${error.message}`) : (`${error}`)}`+"\`\`\`")
)

}
