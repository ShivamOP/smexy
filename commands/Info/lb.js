

const Discord = require("discord.js")
module.exports = {
    name: "leaderboard",
    desc: "Shows a list of cmds or info about a specific command.",
    aliases: ['lb'],
        async run(bot, message, args, prefix) {

const embed = new Discord.MessageEmbed()
.setColor("BLUE")
.setTitle("Leaderboard") 
.setDescription("Please supply one of the options below.") 
.addField(`Levels Leaderboard`,`\`\`\`${prefix}leaderboard levels\`\`\``) 
.addField(`Message Leaderboard`,`\`\`\`${prefix}leaderboard messages\`\`\``) 
.addField(`Invites Leaderboard`, `\`\`\`${prefix}leaderboard invites\`\`\``)
.setTimestamp()
.setThumbnail(bot.user.displayAvatarURL({dynamic: true}))


if(args.length) {
if(args[0] === "levels") {
  try { bot.commands.get("leaderboard-levels").run(bot, message, args, prefix)
} catch (e) {
  console.error(e)
  message.channel.send(e)
}
} else if(args[0] === "messages") {
  try { bot.commands.get("leaderboard-messages").run(bot, message, args, prefix)
} catch (e) { 
  console.error(e)
  message.channel.send(e)
}
}
else if(args[0] === "invites") {
try {bot.commands.get("leaderboard-invites").run(bot, message, args, prefix);
} catch (e) {
  console.error(e)
  message.channel.send(e)
}
} else { 
  message.channel.send(embed)
}
} else {
  message.channel.send(embed)
}

}
}