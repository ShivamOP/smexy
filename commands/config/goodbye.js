module.exports =  {
name: "goodbye", 
aliases: [], 
    desc: "To preview the goodbyer module",
userPerms: ["ADMINISTRATOR"],
botPerms: [],
async run(bot, message, args, prefix) {
  try {
const discord = require("discord.js")
const db = require("quick.db")

const member = message.member;
    let leaveChannel = db.fetch(`leave_${member.guild.id}`)

    if (leaveChannel === null) return message.channel.send(`\`${prefix}leavechannel\` **|** Please set a goodbye channel first to preview it.`) 

    let leaveMsg = db.fetch(`leavemsg_${member.guild.id}`)
    if (leaveMsg === null) {
        db.set(`leavemsg_${member.guild.id}`,`😢 {member:username} just left the server... We are down to {server:members} members... `)
    }

    let newLeaveMsg = db.fetch(`leavemsg_${member.guild.id}`)
    let content = newLeaveMsg  .replace(/{member:mention}/g, `<@${member.user.id}>`)      
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
let img = await leaveCanvas.setUsername(member.user.username) .setDiscriminator(member.user.discriminator) .setMemberCount(member.guild.memberCount) .setGuildName(member.guild.name) .setAvatar(member.user.displayAvatarURL({ format: 'png' }))
.setColor("border", "#0000FF") 
.setColor("username-box", c) 
.setColor("discriminator-box", c) 
.setColor("message-box", c)
.setColor("title", "#3CC7EF")
.setColor("avatar", "#FF0000")


let image = await img.toAttachment();
let attachment = new Discord.MessageAttachment(image.toBuffer(), "goodbye-image.png");

const embed = new discord.MessageEmbed()
    .setColor("RANDOM")
//.setFooter(member.guild.name, member.guild.iconURL({dynamic: true}))
    .setTimestamp() 
    .setDescription(content)
 .setThumbnail(member.user.displayAvatarURL({dynamic: true}))


const lc = member.guild.channels.cache
    .get(leaveChannel);
    if(!lc) return;
    
    lc.send(`<@${member.user.id}>`,embed)
    .then(async() => lc.send(attachment))
.then(async() => 
  message.channel.send(`✅ **|** Goodbye preview has been sent to <#${leaveChannel}>`)) 
} catch (e) {
  console.error(e)
  message.channel.send(`An error occurred. Please report this in my support server: \`${e}\``)
}




}
}
