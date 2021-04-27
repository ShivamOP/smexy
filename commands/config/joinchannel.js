

  module.exports = {
name: "joinchannel", 
aliases: [],
usage: "<channel ID/mention/name>",
desc: "To set the join channel",
userPerms: ["ADMINISTRATOR"],
botPerms: [],
async run(bot, message, args, prefix) {
const db = require("quick.db")
 
 if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply("You need \`ADMINISTRATOR\` permission to use this command") 
 if(args[0]) { let Channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[0]))
        if (!Channel) return message.channel.send({
            embed: {
                title: 'Missing Channel',
                description: 'Please Provide a valid channel mention/id/name.',
                fields: [{
                    name: 'Usage',
                    value: `\`${prefix}joinchannel <channelID | channelMention | channelName>\``
                }],
                timestamp: new Date(),
                color: 'RED'

            }
        })
        await db.set(`welcome_${message.guild.id}`, Channel.id)
        await message.channel.send({
            embed: {
                title: 'Success!',
                description: `Join channel set as: <#${Channel.id}>!`,
                color: 'GREEN'
              
            }
        })
 }
    let welcome = db.get(`welcome_${message.guild.id}`);
    if(welcome !== null) welcome = `\<\#${welcome}\>`;
if(!args[0]) return message.channel.send({embed: {
title: 'Join Massage', 
description: 'When a user joins the server the join message is sent in the join channel.', 
color: "BLUE", 
fields: [
{ name: "Set Join Channel", value: `\`${prefix}joinchannel <channel>\`` }, 
{ name: "Current Value", value: welcome }
]
}}) 
}
}