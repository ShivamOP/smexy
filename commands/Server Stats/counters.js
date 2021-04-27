
const Discord = require('discord.js');
const db = require("quick.db") 

module.exports = {
name: "counter", 
aliases: ["counters"], 
async run(bot, message, args, prefix) {
    if(!message.member.hasPermission('ADMINISTRATOR') || !message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('You need administrator permissions to use this command');

    if(!args[0]){
            message.channel.send(new Discord.MessageEmbed()
.setTitle("📊 Server Stats")
.setDescription(`It adds fancy counters to your discord server that will show: all members, humans, bots, channels, categories, voice, text, roles, bans, online, offline, dnd, idle, emojis, static, animated, boosts, tier. The bot automatically updates all the counters every 15 minutes.`) 
.addField("・Members Counters", [
`\`\`\`
Members - Shows members and bots. \nHumans - Shows only members.\nBots - Shows only bots.\`\`\``
]) 
.addField("・Channels Counter", [`\`\`\`
Channels - Shows text, voice and category channels.\nCategory - Shows category channels.\nText - Shows text channels.\nVoice - Shows voice channels.
\`\`\``])

.addField("・Roles Counter", [
`\`\`\`
Roles - Shows amount of roles in the srrver.\n
\`\`\``
])
.addField("・Bans Counter", [
`\`\`\`
Bans - Shows amount of banned users in the server.
\`\`\``])
.addField("・Emojis Counter", [
`\`\`\`
Emojis - Shows amount of emojis in the server.\nStatic - Shows amount of static emojis (normal-emojis) in the server.\nAnimated - Shows amount of animated emojis (nitro-emojis) in the server.
\`\`\``
]) 
.addField("・Boosts Counter", [
`\`\`\`
Boosts - Shows amount of boosts of the server.\nTier - Shows the tier (level) of boosts of the server.
\`\`\``]) 
.addField("・Status/Presence Counter", [
 `\`\`\`
Online - Shows amount of server members with online status\nOffline - Shows amount of server members with offline status\nDND - Shows amount of server members with DND status\nIdle - Shows amount of server members with idle status
 \`\`\`` 
  ])
.addField("Usage:", [
`\`${prefix}setup\` - To setup the server stats/counters system in this server and to create all the default counters (Members, Humans, Bots).`, 
`\`${prefix}counter-create\` - To create a counter.`, 
`\`${prefix}counter-delete\` - To delete a counter.`, 
`\`${prefix}counters-list\` - To get a list of all current active counters.`, 
`\`${prefix}reset\` - To reset the all current active counters. `
])
.setColor("GREEN")

) 
    }
    
}
}
