module.exports = {
  name: "embed", 
  aliases: ["embd"], 
  async run(bot, message, args, prefix) {
   
   let { MessageEmbed } = require("discord.js")
  
 
  
   let embd = new MessageEmbed() 
.setColor("RED") 
.addField("Usage", `
\`${prefix}embed <message>\`\n\nYou can also use animated emojis in embed even if you don't have nitro :)
`)
if(!args[0]) return message.reply(embd);

let emojis = message.guild.emojis.cache.filter(emoji => emoji.animated);
let ids = (emojis.map(e => '<'+'a'+':'+ e.name +':'+e.id+'>'
));
let keys = (emojis.map(e => ':'
+ e.name + ':'));
let result =  Object.assign.apply({}, keys.map((v, i) => ( {[v]: ids[i]} ) ) );
let str = args[0];
let arr = result;
let new_str = str;

for (var key in arr) {
    if (!arr.hasOwnProperty(key)) continue;
  new_str = new_str.split(key).join(arr[key])
}
    

let desc = new_str;
   let embed = new MessageEmbed()
   .setColor("RANDOM")
   .setDescription(desc || null)
   message.channel.send(embed)
   
 
    
  }
}