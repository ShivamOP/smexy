const ms = require('ms')



const Discord = require('discord.js');
const bot = new Discord.Client();
module.exports = {
    name: "gend",
    desc: "Bans a user",
    perms: "BAN_MEMBERS",
    usage: ">ban [@user/user_ID]",
    aliases: [],
        async run(bot, message, args) {

        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You do not have permissions to use this command')
        if(!args[0]) return message.channel.send('Please specify a message id')

        const giveaway = bot.giveaways.giveaways.find((g) => g.messageID === args.join(" "))
        if(!giveaway) return message.channel.send('Giveaway not found')

        bot.giveaways.edit(giveaway.messageID, {
            setEndTimestamp: Date.now()
        }).then(()  => {
            message.channel.send(`Giveaway wil end in less than ${5000 / 1000} seconds.`)
        }).catch(err => {
            console.log(err)
            message.channel.send('An error occured')
        })
        
        }
    }