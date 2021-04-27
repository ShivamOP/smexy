

const Discord = require('discord.js')

const afkSchema = require('../../models/afk.js')



module.exports = {
    name: "afk",

    description: "Set a afk message",

    async run(bot, message, args) { 
        let afkMessage = args.join(' ')
        let userId = message.author.id
        let guildId = message.guild.id

        const embed = new Discord.MessageEmbed()

       

        if (!afkMessage) {
            afkMessage = 'AFK'
        }

        await afkSchema.findOneAndUpdate({ 
            guildId,
            userId
        }, {
            guildId,
            userId,
            $set: {
                afk: afkMessage,
                timestamp: new Date().getTime(),
                username: message.member.nickname === null ? message.author.username : message.member.nickname //Keep Old Username
            }
        }, {
            upsert: true,
        })

        await message.member.setNickname(`[AFK] ${message.member.nickname === null ? `${message.author.username}` : `${message.member.nickname}`}`).catch((e) => {

  }) 

        return message.reply(`I set your afk: ${afkMessage}`)
          }
}

