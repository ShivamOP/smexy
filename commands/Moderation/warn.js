const db = require('../../models/warns')

const { Message, MessageEmbed } = require('discord.js')


module.exports = {
    name :'warn',
   aliases: ['strike'], 
     async run(bot, message, args) {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You do not have permissions to use this command.')
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) {
const errembed = new MessageEmbed() 
.setColor('0x#ff000') 
.setDescription(`<:smexy_cross:804566090545365013> User not found.`) 
 message.channel.send(errembed)}
        const reason = args.slice(1).join(" ")
        db.findOne({ guildid: message.guild.id, user: user.user.id}, async(err, data) => {
            if(err) throw err;
            if(!data) {
                data = new db({
                    guildid: message.guild.id,
                    user : user.user.id,
                    content : [
                        {
                            moderator : message.author.id,
                            reason : reason
                        }
                    ]
                })
            } else {
                const obj = {
                    moderator: message.author.id,
                    reason : reason
                }
                data.content.push(obj)
            }
            data.save()
        });
        user.send(new MessageEmbed()
            .setDescription(`You have been warned in **${message.guild.id}** for:` + reason || 'No Reason Was Given.')
.setThumbnail(message.guild.iconURL({dynamic: true})) 
            .setColor("CYAN")
        )
        message.channel.send(new MessageEmbed()
            .setDescription(`Warned ${user} for ${reason}`).setColor('BLUE')
        )
    }
}