

  module.exports = {
name: "leavechannel", 
aliases: [], 
usage: "<channel ID/mention/name>",
desc: "To set the leave channel",
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
                    value: `\`${prefix}leavechannel <channelID | channelMention | channelName>\``
                }],
                timestamp: new Date(),
                color: 'RED'

            }
        })
        await db.set(`leave_${message.guild.id}`, Channel.id)
        await message.channel.send({
            embed: {
                title: 'Success!',
                description: `Leave channel set as: <#${Channel.id}>!`,
                color: 'GREEN'
              
            }
        })
 }
    let welcome = db.get(`leave_${message.guild.id}`);
    if(welcome !== null) welcome = `\<\#${welcome}\>`;
if(!args[0]) return message.channel.send({embed: {
title: 'Leave Massage', 
description: 'When a user leaves the server the leave message is sent in the leave channel.', 
color: "BLUE", 
fields: [
{ name: "Set Leave Channel", value: `\`${prefix}leavechannel <channel>\`` }, 
{ name: "Current Value", value: welcome }
]
}}) 
}
}