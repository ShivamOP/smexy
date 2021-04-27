const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "bots",
  aliases: ["all-bots","bot-list", "bots-list"], 
  async run(bot, message, args) {
    const bots = message.guild.members.cache.filter(m=>m.user.bot).map(m=> `<@${m.id}> [ ${m.user.username} ]
    **ID :** \`${m.id}\``);
    const x = new MessageEmbed()
    .setColor('GREEN')
   const d = bots.join('\n \━\━\━\━\━\━\━\━\━\━\━\━\━\━\━\━\━\━\ \n');
   x.setDescription(d.length < 2048 ? d : (d.slice(0, 2000)+".............."))
    .setTitle("Bots List of "+message.guild.name)
    .setThumbnail(message.guild.iconURL({dynamic: true}))
    .setFooter(`Total Bots : ${message.guild.members.cache.filter(member => member.user.bot).size}`)
    message.channel.send(x)
  }
}

