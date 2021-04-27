const shortUrl = require('node-url-shortener');
const isStrUrl = require('isstrurl');
module.exports = {
  name: "shorturl",
  aliases: ["short-url","url-shortner"],
  async run(bot, message, args)  {
   if(!args[0]) return message.reply('Please provide a URL to short.');
var res = isStrUrl(args[0]);
if (res == true) {
shortUrl.short(args[0], function(err, url){
    if(url) { message.reply(`Here is your shortened URL.
${url}`) }
else { message.reply(`Error: ${err}`) 
}
})
} else if (res == false) {
 message.reply("That isn't a valid URL.")
} 
}

}