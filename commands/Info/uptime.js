const {MessageEmbed} = require("discord.js");

module.exports = {
name: "uptime", 
aliases: [], 
run: async(bot, message, args, prefix) => {
    const up = bot.uptime;
    let days = Math.floor(up / 86400000);

    let hours = Math.floor(up / 3600000) % 24;

    let minutes = Math.floor(up / 60000) % 60;
    let seconds = Math.floor(up / 1000) % 60;

const embed = new MessageEmbed()
.setColor("0x#FFFFFF")
.setTitle("Uptime")
.setDescription(`${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`)
.setFooter(`Last started on`)
.setTimestamp(bot.readyTimestamp)
//.setAuthor(bot.user.tag, bot.user.displayAvatarURL())
message.channel.send(embed)
}
}