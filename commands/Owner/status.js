module.exports = {
  name: 'status',
  desc: 'set status',
aliases: ['activity'], 
owner: true, 
botperms: [], 
userperms: [], 
  async run(bot, message, args){

    const type = args[0]
    const status = args.slice(1).join(" ");
    if(!status) return message.channel.send(`You must specify a status.`)

    if(type === 'watching'){
      bot.user.setActivity(`${status}`, {
  type: "WATCHING"
});
await message.react('✅')
    } else if(type === 'listening'){
      bot.user.setActivity(`${status}`, {
        type: "LISTENING"
      });
      await message.react('✅')
    } else if(type === 'playing'){
      bot.user.setActivity(`${status}`, {
        type: "PLAYING"
      });
      await message.react('✅')
    } else if(type === 'streaming'){
      bot.user.setActivity(`${status}`, {
        type: "STREAMING",
        url: 'https://www.twitch.tv/test'
      });
      await message.react('✅')
    } else if(type === 'competing'){
      bot.user.setActivity(`${status}`, {
        type: "COMPETING"
      });
      await message.react('✅')
    } else if (!['watching', 'listening', 'playing', 'streaming', 'competing'].includes(type)) {
      message.channel.send("Your type must be valid. The valid status types are as following:\n`watching, listening, playing, streaming, competing`. Please try again, but this time with valid input. Thank you")
    }
  }
}