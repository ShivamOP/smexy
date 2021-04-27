const Discord = require('discord.js');
const bot = new Discord.Client();
const db = require('quick.db');
module.exports = {
    name: "autorole-list",
    aliases: ["autorolelist","autoroles-list","autoroleslist"],
    desc: "list all the autoroles",
userPerms: ["MANAGE_ROLES"],
botPerms: [],
        async run(bot, message, args) {
if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply("You need \`ADMINISTRATOR\` permission to use this command") 

let check = db.get(`${message.guild.id}-autoroles`) 
if(check === null || !check[1]) {
return message.channel.send("There are no autoroles set in this server.")
}
let data = [];
let index = 1;
let roles = check.slice(1);
roles.forEach(r => {
data.push(`**${index++}**. ${message.guild.roles.cache.get(r)}`)
}) 

message.channel.send(new Discord.MessageEmbed() 
.setColor("BLUE") 
.setTitle(`Autoroles list of ${message.guild.name}`) 
.setThumbnail(message.guild.iconURL({dynamic: true})) 
.setDescription(data.join(" "))
.setFooter(`Total Autoroles: ${data.length}`) 
.setTimestamp() 
)

}
}