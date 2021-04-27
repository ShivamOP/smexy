

const db = require("quick.db")
const Discord = require("discord.js");
module.exports = {
name: "rr-make",botPerms: ["MANAGE_ROLES"], 
 userPerms: ["MANAGE_ROLES"], 

aliases: ["rr-build","rr-builder"], 
async run(bot, message, args, prefix) {


let channel = await bot.awaitReply(message, "Reaction Role Setup • 1/4", "Please specify a channel ID or mention."); 
if(!channel) return message.channel.send("Cancelled you have no time left!");
    if (channel === "cancel") return message.channel.send("Cancelled");
channel = channel.replace("<", "").replace("#", "").replace(">","");
channel = message.guild.channels.cache.get(channel) || undefined;
if(!channel) return message.reply("Please provide a valid channel ID or mention.");

let msg = await bot.awaitReply(message, "Reaction Role Setup • 2/4", "Please specify a message ID. Make sure the message is in "+`${channel}`); 
if(!msg) return message.channel.send("Cancelled you have no time left!");
    if(msg === "cancel") return message.channel.send("Cancelled");
msg = await channel.messages.fetch(msg)
 if(!msg) return message.channel.send(`Please provide a valid message ID. 
Use Developer Mode to get the Copy ID option.
On desktop? Settings -> Appearance -> Enable Developer Mode https://i.imgur.com/oXpu84h.gif
On mobile? Settings -> Behavior -> Enable Developer Mode https://i.imgur.com/xnpXITJ.mp4`);


let letter = await bot.awaitReply(message, "Reaction Role Setup • 3/4", "Please specify an emoji. The following emoji will be the emoji that the user will react to."); 
if(!letter) return message.channel.send("Cancelled you have no time left!");
    if(letter === "cancel") return message.channel.send("Cancelled");
let emote;
let emoji = Discord.Util.parseEmoji(letter);
if(!emoji) return message.reply("Please provide a valid emoji.");
if(emoji.id) { 
emote = bot.emojis.cache.get(emoji.id) ;
}
else {
  emote = emoji.name;
}
if(!emote) return message.reply("Please provide a valid emoji.");



let role = await bot.awaitReply(message, "Reaction Role Setup • 4/4","Please specify a role ID or mention. The following Role will be given when the user reacts.") 
          
          if(!role) return message.channel.send("Cancelled you have no time left!");
    if(role === "cancel") return message.channel.send("Cancelled");
role = role.replace("<", "").replace("@", "").replace("&","").replace(">","");
role = message.guild.roles.cache.get(role);
if(!role) return message.reply("Please provide a valid role ID or mention.");
const a = message.member.roles.highest.position;
    const b = role.position;
      const c = message.guild.me.roles.highest.position;
      if(a <= b && message.guild.ownerID !== message.author.id) return message.channel.send(`The role \'${role.name}\' (position ${role.position}) is above or equal to your highest role \'${message.member.roles.highest.name}\' (position ${message.member.roles.highest.position}) and cannot be handed out by you. Please ensure that your highest role is above the role you want to be assigned.`);
      if(c <= b) return message.channel.send(`The role \'${role.name}\' (position ${role.position}) is above or equal to my highest role \'${message.guild.me.roles.highest.name}\' (position ${message.guild.me.roles.highest.position}) and cannot be handed by me. Please ensure that my highest role is above the role you want to be assigned.`);
        if(role.managed) return message.channel.send(`That role is managed. (that is a role of a bot) which cannot be assigned to normal members.`);


let check = db.get(`reactions_${message.guild.id}_${msg.id}`)
if (check && check.find((x) => x.emoji === emote.toString())) {
    return message.channel.send(`The emoji is already being used in the message for reaction Roles.`)
}
if(!db.has(`reactions_${message.guild.id}_${msg.id}`)) {
db.set(`reactions_${message.guild.id}_${msg.id}`, [])
}
db.push(`reactions_${message.guild.id}_${msg.id}`, {
emoji: emote.toString(), 
roleId: role.id
})
try {
await msg.react(emote.toString()) 

} catch(err) { message.chan
nel.send("An error occured while reacting to the message: "+"\`"+err+"\`") };
message.channel.send(`Added ${emote} with the role \`${role.name}\`\n${msg.url}`)


}
}