const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const superagent = require('superagent');

module.exports = {
   
        name: "bj",
        aliases: [],
        category: "nsfw",
        nsfw: true, 
        description: "Shows random blowjob image",
    run: async (bot, message, args) => {
   if (!message.channel.nsfw) {
        message.react('💢');
        return message.channel.send({embed: {
                color: 16734039,
                description: "You can use this command in an NSFW Channel!"
            }})
    }
    superagent.get('https://nekos.life/api/v2/img/bJ')
        .end((err, response) => {
      const embed = new MessageEmbed()
      .setTitle(":smirk: BJ")
      .setImage(response.body.url)
      .setColor(`RANDOM`)
      .setFooter(`Tags: bj, blowjob`)
      .setURL(response.body.url);
  message.channel.send(embed);
    })
  }
}