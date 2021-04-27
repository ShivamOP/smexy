
module.exports = {
name: "add-xp", 
aliases: [], 
userPerms: ["ADMINISTRATOR"], 
async run(bot, message, args, prefix) {
  
let levels = bot.levels;
let rankuser = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
                if (!rankuser) return message.reply("User not found. Please provide a valid user mention or ID.");
                if(rankuser.bot) return message.reply("Bots are not ranked.");

if(!parseInt(args[1]) || isNaN(parseInt(args[1]))) return message.channel.send(`Please provide amout of xp to add. \nUsage: \`${prefix}add-xp <@user/user_ID> <xp>\``);
if(parseInt(args[1]) < 0) return message.channel.send("Please provide a positive number.");
  
  try { 
    levels.setXp(message.guild.id, rankuser.user.id, Number(args[1])).then(() => {
message.channel.send(`Successfully added \`${parseInt(args[1])}\` xp to **${rankuser.user.tag}**`)
})
  } catch (err) {
    console.error(err.message)
    return message.reply(`An error occured: \`${err}\``);
  }
}
}