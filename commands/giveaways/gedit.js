const Discord = require('discord.js');

const bot = new Discord.Client();

const ms = require('ms');
module.exports = {
    name: "gedit",
    desc: "Shows a list of cmds or info about a specific command.",
    aliases: [],

        async run(bot, message, args, prefix) {
            const Discord = require('discord.js');

if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You do not have permissions to use this command')
const embeds = new Discord.MessageEmbed()
.setColor('0x#ff0000')
.addField(`Usage:`,`\`${prefix}gedit <messageID> <newWinnerCount> <timeToBeAdded>  <newPrize>\``, false)
.addField(`Example:`,`\`${prefix}gedit 805344331450810390 2 1d  Test Giveaway\``, false);

            if(!args[3]) return message.channel.send(embeds);
       
    
            
           
            const messageID = args[0]
            
        const giveaway = bot.giveaways.giveaways.find((g) => g.messageID === args[0]);
            if(!messageID) return message.channel.send(`Please enter a valid message id`)
            if(!giveaway) return message.channel.send('Giveaway not found')

            const duration = args[2]
            if(!duration) return message.channel.send('Please enter a valid duration')
            if(
                !args[2].endsWith('d') &&
                !args[2].endsWith('h') &&
                !args[2].endsWith('m') &&
                !args[2].endsWith('s')
              )
                return message.channel.send('You need to use d (days), h (hours), m (minutea), s (seconds)')

            const winners = args[1]
            if(!winners) return message.channel.send('Please specify an amount of winners')
    
            const prize = args.slice(3).join(" ")
            if(!prize) return message.channel.send('Please sepcify a prize to win')
        
           bot.giveaways.edit(giveaway.messageID, {
                newWinnerCount: winners,
                newPrize: prize,
                addTime: ms(duration)
            }).then(() => {
                // here, we can calculate the time after which we are sure that the lib will update the giveaway
                const numberOfSecondsMax = 5000 / 1000;
                message.channel.send('Success! Giveaway will be updated in less than ' + numberOfSecondsMax + ' seconds.');
            }).catch((err) => {
                console.log(err)
                message.channel.send('No giveaway found for ' + messageID + ', please check and try again');
            });
        }
    }