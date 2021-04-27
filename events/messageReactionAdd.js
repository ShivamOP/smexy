
const Discord = require("discord.js")
const db = require("quick.db")
module.exports = async(bot, reaction, user) => {

  
if(!reaction.message.guild) return;
if(user.bot) return;
 if (user.partial) await user.fetch();

  if (reaction.partial) await reaction.fetch();
  if (reaction.message.partial) await reaction.message.fetch();
  
    
const { guild } = reaction.message;
 if (guild.me.hasPermission("MANAGE_ROLES")) {
  const member = guild.members.cache.get(user.id);
  if (member) {
  
const data = db.get(`reactions_${guild.id}_${reaction.message.id}`)
  if (data) {
  const reaction2 = data.find(
    (r) => r.emoji === reaction.emoji.toString()
  );
  console.log(reaction2)
  
  if (reaction2) {
    if(!member.roles.cache.has(reaction2.roleId)) {
member.roles.add(reaction2.roleId).catch(err => {});
} } } } }
//////////////////
///////// STARBOARD
/////////// /
    const handleStarboard = async () => {
    const Client = bot;
   const SBChannel = bot.channels.cache.get("826050139881078784")
     
        const msgs = await SBChannel.messages.fetch({ limit: 100 }).catch(err => console.error(err))
        const SentMessage = msgs.find(msg => 
            msg.embeds.length === 1 && msg.embeds[0].footer && msg.embeds[0].footer.text ? (msg.embeds[0].footer.text.startsWith(reaction.message.id) ? true : false) : false);
        if(SentMessage) SentMessage.edit(`${reaction.count} - ⭐ **|** ${reaction.message.channel.toString()}`).catch(error => console.error(error));
        else {
            const embed = new Discord.MessageEmbed()
            .setAuthor(reaction.message.author.tag, reaction.message.author.displayAvatarURL())
            .setDescription(`${reaction.message.content}\n\n**[Jump to the message](${reaction.message.url})**`) 
.setAuthor(reaction.message.author.tag, reaction.message.author.displayAvatarURL({dynamic: true})) 
            .setColor('YELLOW')
            .setFooter(reaction.message.id)
            .setTimestamp()
.setImage(reaction.message.attachments.first() ? reaction.message.attachments.first().proxyURL : null) 
            if(SBChannel)
            SBChannel.send(`1 - ⭐ **|** ${reaction.message.channel.toString()}`, embed).catch(e => console.error(e))
        }
    }
    if(reaction.emoji.name === '⭐') {
  
   //  if(reaction.message.channel.id === channel.id) return;
       handleStarboard();
    }
    
    
}