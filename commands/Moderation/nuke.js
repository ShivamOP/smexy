
module.exports = {
name: 'nuke',
aliases: [], 
botPerms: ['MANAGE_MESSAGES', 'MANAGE_CHANNELS'], 
userPerms: ['MANAGE_MESSAGES', 'MANAGE_CHANNELS'], 
time: 30000,
async run(bot, message, args, prefix) {
  if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("You don't have enough permissions to use this command.")
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have enough permissions to use this command.")

 let p = message.channel.position;
await message.channel.clone().then(async (n) => {
message.channel.delete() 
n.setPosition(p) 
n.send(`Nuked this channel.\nhttps://i.imgur.com/lVdV21e.gif`) 
}) 
}
}