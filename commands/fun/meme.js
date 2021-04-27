const Discord = require('discord.js');
const bot = new Discord.Client();
const got = require('got');
module.exports = {
    name: "meme",
    desc: "Shows a list of cmds or info about a specific command.",
    aliases: [],
        async run(bot, message, args) {


 
  
            got('https://www.reddit.com/r/memes/random/.json').then(res => {
                let content = JSON.parse(res.body);
               // console.log(content[0].data.children[0].data);
                message.channel.send(
                    new Discord.MessageEmbed()
                        .setTitle(content[0].data.children[0].data.title)
             .setURL(content[0].data.children[0].data.icon_url)                  .setImage(content[0].data.children[0].data.url)
                        .setColor("RANDOM")
                        .setFooter(`👍 ${content[0].data.children[0].data.ups} 👎 ${content[0].data.children[0].data.downs} | 💬 ${content[0].data.children[0].data.num_comments}`)
                )
            })
        }
    

    }