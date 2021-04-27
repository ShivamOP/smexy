module.exports =  {
name: "welcome", 
aliases: [], 
    desc: "To preview the welcomer module",
userPerms: ["ADMINISTRATOR"],
botPerms: [],
async run(bot, message, args, prefix) {
  try {
const discord = require("discord.js")
const db = require("quick.db")

const member = message.member;
    let joinChannel = db.fetch(`welcome_${member.guild.id}`)

    if (joinChannel === null) return message.channel.send(`\`${prefix}joinchannel\` **|** Please set a welcome channel first to preview it.`) 

    let joinMsg = db.fetch(`joinmsg_${member.guild.id}`)
    if (joinMsg === null) {
        db.set(`joinmsg_${member.guild.id}`,`Welcome {member:mention}! We now have {server:members} member!`)
    }

    let newJoinMsg = db.fetch(`joinmsg_${member.guild.id}`)
    let content = newJoinMsg
        .replace(/{member:mention}/g, `<@${member.user.id}>`)      
  .replace(/{member:id}/g, `${member.user.id}`)
.replace(/{member:tag}/g, `${member.user.tag}`)
        .replace(/{member:username}/g, `${member.user.username}`) 
.replace(/{member:avatar}/g, `${member.user.displayAvatarURL({dynamic: true})}`) 
        .replace(/{member:discriminator}/g, `${member.user.discriminator}`)
        .replace(/{member:joinedAt}/g, `${member.joinedAt}`)
        .replace(/{member:createdAt}/g, `${member.user.createdAt}`)
        .replace(/{server:name}/g, `${member.guild.name}`)
        .replace(/{server:members}/g, `${member.guild.memberCount}`)
.replace(/{server:id}/g, `${member.guild.id}`)
.replace(/{server:icon}/g, `${member.guild.iconURL({dynamic: true})}`) 
        .replace(/{channel:name}/g, `${message.channel.name}`)
.replace(/{channel:id}/g, `${message.channel.id}`)
.replace(/{date}/g, `${new Date().toDateString()}`)
    


const Discord = require("discord.js")
const canvas = require('discord-canvas'), welcomeCanvas = new canvas.Welcome(), leaveCanvas = new canvas.Goodbye();
const universalColor = "0x#FFFF00"
const c = "#3CC7EF"
let img = await welcomeCanvas.setUsername(member.user.username) .setDiscriminator(member.user.discriminator) .setMemberCount(member.guild.memberCount) .setGuildName(member.guild.name) .setAvatar(member.user.displayAvatarURL({ format: 'png' }))
.setColor("border", "#0000FF") 
.setColor("username-box", c) 
.setColor("discriminator-box", c) 
.setColor("message-box", c)
.setColor("title", "#3CC7EF")
.setColor("avatar", "#FF0000")



let image = await img.toAttachment();
let attachment = new Discord.MessageAttachment(image.toBuffer(), "welcome-image.png");

const embed = new discord.MessageEmbed()
    .setColor("RANDOM")
//.setFooter(member.guild.name, member.guild.iconURL({dynamic: true}))
    .setTimestamp() 
    .setDescription(content)
 .setThumbnail(member.user.displayAvatarURL({dynamic: true}))


const lc = member.guild.channels.cache
    .get(joinChannel);
    if(!lc) return;
    
    lc.send(`<@${member.user.id}>`,embed)
    .then(async() => lc.send(attachment))
.then(async() => 
  message.channel.send(`✅ **|** Welcome preview has been sent to <#${joinChannel}>`)) 
} catch (e) {
  console.error(e)
  message.channel.send(`An error occurred. Please report this in my support server: \`${e}\``)
}




}
}
