const Discord = require('discord.js');

const bot = new Discord.Client();

module.exports = {
    name: "greroll",
    desc: "Bans a user",
    perms: "BAN_MEMBERS",
    usage: ">ban [@user/user_ID]",
    aliases: [],
        async run(bot, message, args) {
    
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You do not have permission')

        if(!args[0]) return message.channel.send('Please specify a message id')

        const giveaway = bot.giveaways.giveaways.find((g) => g.messageID === args[0]);
        if(!giveaway) return message.channel.send('Couldn\'t find the giveaway.')

        bot.giveaways.reroll(giveaway.messageID)
            .then(() => {
                message.channel.send("Giveaway rerolled.");
            })
            .catch(err => {
                console.log(err)
                message.channel.send(err)
            })
    }
}