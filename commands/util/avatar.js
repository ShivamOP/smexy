const { MessageEmbed } = require("discord.js")
module.exports = {
name: "avatar", 
aliases: ["av", "pfp", "picture", "photo", "icon"], 
desc: "Shows the user's avatar.", 
usage: `[@user | user_ID | user_name]`, 
run: async(bot, message, args, prefix) => {

const target = message.mentions.users.first() || bot.users.cache.get(args[0]) || bot.users.cache.find(u => u.username.toLowerCase() === args.join(" ").toLowerCase()) || bot.users.cache.find(u => u.tag.toLowerCase() === args.join(" ").toLowerCase()) || message.author;


const embed = new MessageEmbed() 
.setColor("RANDOM") 
.setTitle("Avatar")
.setAuthor(target.tag,target.displayAvatarURL({dynamic: true}))
.setDescription(`[PNG](${target.displayAvatarURL({format: "png"})}) **|** [JPG](${target.displayAvatarURL({format: "jpg"})}) **|** [JPEG](${target.displayAvatarURL({format: "jpeg"})}) **|** [GIF](${target.displayAvatarURL({format: "gif"})}) **|** [WEBP](${target.displayAvatarURL({format: "webp"})})`) 
.setImage(target.displayAvatarURL({dynamic: true, size: 512}))
.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
message.channel.send(embed) 

}
}