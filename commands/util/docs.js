
const fetch = require('node-fetch');
const qs = require('querystring');
const discord = require('discord.js');

module.exports = {
name: "docs", 
aliases: ["djs", "djsdocs"], 
        async run(bot, message, args) {

if(!args[0] || !args.length) return message.reply('Please enter something to search that in discord.js documentation!');


const body = await fetch(	`https://djsdocs.sorta.moe/v2/embed?${qs.stringify({ src: "stable", q: args.join(" ")})}`
		).then(res => res.json()).catch(() => null);

   if(!body || body.error) return message.reply('Could not find that documentation');

          		//delete body.color;
		const embed = new discord.MessageEmbed(body);
			message.channel.send(embed) 
	

          
        
     


  }
}
	



