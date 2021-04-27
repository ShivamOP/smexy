const Discord = require('discord.js');

const bot = new Discord.Client();

module.exports = {
    name: "remove-emoji",
    desc: "Removes the provided emoji from the server",
    userPerms: ["MANAGE_EMOJIS"], 
    botPerms: ["MANAGE_EMOJIS"],  usage: '[ emoji | emoji_id | emoji_name ]', 
    aliases: ['re','removeemoji'],
        async run(bot, message, args) {
    if (!message.member.hasPermission("MANAGE_EMOJIS")) {
return message.channel.send(`:x: | **You Don't Have Permission To Manage Emojis**`)
}
 if (!message.guild.me.hasPermission("MANAGE_EMOJIS")) {
return message.channel.send(`:x: | **I Don't Have Permission To Manage Emojis. **`)
}
if(!args[0]) return message.channel.send(`Please send a valid emoji.`)
   
        let emoji = Discord.Util.parseEmoji(args[0]);
let emote;
if(emoji.id) emote = message.guild.emojis.cache.get(emoji.id)
else { emote =  message.guild.emojis.cache.find(e => e.name.toLowerCase() === args[0].toLowerCase()) || message.guild.emojis.cache.get(args[0]);
}
if(!emote) return message.channel.send(`Please provide a valid emoji.`);
let name = emote.name;
try { emote.delete().then(async em => message.channel.send(`Deleted the \`${name}\` emoji.`));
} catch (e) {
return message.channel.send(`An error occurred: \`${e}\``);
}


     
}
}