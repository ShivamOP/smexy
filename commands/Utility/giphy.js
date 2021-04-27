const Discord = require("discord.js")
const giphy = require('giphy-api')("b8OBaMqySfwjBdlBK5b2uSTSqy6BqnpI");

module.exports = {
  name:"giphy", 
  nsfw: true, 
  aliases: ["gif"], 
  async run(bot, message, args) {
  if(!message.guild.me.hasPermission('EMBED_LINKS')) return message.channel.send(`Hey <@${message.author.id}>, I need \`EMBED_LINKS\` perm to run that command !`);

  if (args.length === 0) {
    message.channel.send('No Seacrh terms!')
    return;
  }
  if (args.length === 1) {
    term = args.toString()
  } else {
    term = args.join(" ");
  }
  giphy.search(term).then(function (res) {
    // Res contains gif data!
    let id = res.data[0].id
    let msgurl = `https://media.giphy.com/media/${id}/giphy.gif`
    const embed = {
      "color": 3066993,
      "timestamp": new Date(),
      "footer": {
        "icon_url": "https://raw.githubusercontent.com/Giphy/GiphyAPI/f68a8f1663f29dd9e84ea728421eb2977e42d83/api_giphy_logo_sparkle_clear.gif",
        "text": "Powered by Giphy"
      },
      "image": {
        "url": msgurl
      },
      "fields": [
        {
          "name": "Search Term",
          "value": "`" + term + "`",
          "inline": true
        },
        {
          "name": "Page URL",
          "value": "[Giphy](" + res.data[0].url + ")",
          "inline": true
        }
      ]
    };
    message.channel.send({ embed });

  });

  
}

   }