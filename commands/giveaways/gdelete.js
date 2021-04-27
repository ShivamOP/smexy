const Discord = require('discord.js');

const bot = new Discord.Client();

module.exports = {
    name: "gdelete",
    desc: "Shows a list of cmds or info about a specific command.",
    aliases: [],
        async run(bot, message, args) {
            if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You do not have permissions to use this command')
            const messageID = args[0]
        
            const giveaway = bot.giveaways.giveaways.find((g) => g.messageID === args[0]);
                if(!messageID) return message.channel.send(`Please enter a valid messageID`)
                if(!giveaway) return message.channel.send('Giveaway not found')

await bot.giveaways.delete(giveaway.messageID)
.then(() => {
   message.channel.send('Giveaway deleted!')
 .catch((err) => {
    message.channel.send('No giveaway found for ' + messageID + ', please check and try again');
});

})}
}

