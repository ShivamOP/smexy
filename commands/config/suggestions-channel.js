const { MessageEmbed } = require("discord.js") 
const Discord = require("discord.js") 
const db = require("quick.db")
module.exports = {
name: "suggestionschannel", 
aliases: ['suggestions-channel'], 
usage: "<channel ID/mention/name>",
desc: "To set the suggestions channel",
userPerms: ["ADMINISTRATOR"],
botPerms: [],
async run(bot, message, args) {
if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply("You need \`ADMINISTRATOR\` permission to use this command");
let h = message.guild.channels.cache;
let channel = message.mentions.channels.first() || h.get(args[0]) || h.find(c => c.name.toLowerCase() === args.join(" ").toLowerCase());
if(!channel) return message.channel.send(" Please provide a valid channel mention/name/id.");
db.set(`suggestion_${message.guild.id}`, channel.id);
message.channel.send(`✅ **|** Suggestions channel has been set to ${channel} .`);
}
}