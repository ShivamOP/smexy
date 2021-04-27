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
  if (reaction2) {
    if(member.roles.cache.has(reaction2.roleId)) {
member.roles.remove(reaction2.roleId).catch(err => {});
} } } } }

}