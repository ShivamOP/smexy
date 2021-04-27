const Discord = require("discord.js")
const {MesaageEmbed} = require("discord.js")
module.exports = async(bot) => {
  
bot.sleep = async(time) => { 
return new Promise(resolve => setTimeout(resolve, time))
 }


bot.unembedify = async(embed) => {
    const em = embed;
    let embedString = '';
    if (em.author) embedString += `**${em.author.name}**\n`;
    if (em.title) embedString += `**${em.title}**\n`;
    if (em.description) embedString += `${em.description}\n`;
    for (const field of em.fields || []) {
      embedString += `\n**${field.name}**\n${field.value}\n`;
    }
    if (em.footer) embedString += `\n${em.footer.text}`;
    return `${embed.content || ''}\n${(embedString || 'Empty embed')}`; 
 }


bot.awaitReply = async(message, title, description, footer ,filter , limit) => {
  if(!limit) limit = 60000 * 2;
  if(!filter) filter = (res) => res.author.id === message.author.id;
    if(!footer) footer = "Reply with \"cancel\" to stop the process";
    
        let e = new Discord.MessageEmbed().setDescription(description).setTitle(title).setFooter(footer).setColor("RED");
        await message.channel.send(e)
        return  message.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] })
          .then((collected) => {
return collected.first().content
          })
          .catch(() => false);
}
bot.invite = async(args) => {
let re = /discord(?:app\.com\/invite|\.gg)\/([a-z0-9]{1,16})/gi;
    const match = re.exec(args);
    if (match) {
      return args.replace(match[0], '`Invite`').replace(`https://`,``);replace(`http://`,``);
    } else {
      return args;
}
}

  
  
  
  
}