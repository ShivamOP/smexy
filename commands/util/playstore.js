const Discord = require('discord.js')
const play = require('google-play-scraper')

module.exports= { 
name: "playstore", 
async run(bot, message, args) {

    if(!message.guild.me.hasPermission('EMBED_LINKS')) return message.channel.send(`Hey <@${message.author.id}>, I need \`EMBED_LINKS\` perm to run that command !`);


    let kata = args.join(" ") 
    if(!kata) return message.reply(`Please provide the name of the application you want to search on the playstore.`);
  const hehe = await play.search({term: kata, num:6});
const app1 = hehe[1].appId;
const app11 = await play.app({appId: app1});
const app2 = hehe[2].appId;
const app22 = await play.app({appId: app2});
const app3 = hehe[3].appId;
const app33 = await play.app({appId: app3});
const app4 = hehe[4].appId;
const app44 = await play.app({appId: app4});
const app5 = hehe[5].appId
const app55 = await play.app({appId: app5});


play.search({term: kata,num:1})
    .then(data => {
      
    let app = data[0].appId
    play.app({appId:app})
    .then(lata => {
    let price = lata.price === 0? "Free" : `${lata.price}`
    
    let embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(lata.title)
.setURL(lata.url) 
    .setThumbnail(lata.icon)
    .setDescription(lata.summary)
    .addField('Developer', lata.developer, true)
    .addField('Price', price, true)
    .addField('Ratings', lata.scoreText, true)
    .addField('Install', lata.installs === undefined ? "None" : lata.installs, true)
    .addField('Genre', lata.genre === undefined ? "None" : lata.genre, true)
    .addField('Released Date', lata.released === undefined ? "None" : lata.released, true)
.addField('Reviews', lata.reviews === undefined ? "None" : lata.reviews, true)

    .addField('Comments', lata.comments[0] === undefined ? "None" : lata.comments[0], true)
.addField('More Related Searches',`
**1**. [${app11.title}](${app11.url})
**2**. [${app22.title}](${app22.url})
**3**. [${app33.title}](${app33.url})
**4**. [${app44.title}](${app44.url})
**5**. [${app55.title}](${app55.url})
`) 
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true }))
    .setTimestamp()
    return message.channel.send(`<:googleplaystore:778913243875770388>  **PLASYTORE**  <:googleplaystore:778913243875770388>`, embed);
    })
    })
}
}