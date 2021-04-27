const ms = require('ms')

const { MessageEmbed } = require('discord.js')


const Discord = require('discord.js');
const bot = new Discord.Client();


module.exports = {
    name: "gcreate",
    aliases: ['giveaway'],
        async run(bot, message, args, prefix) {
      const filter = (res) => res.author.id === message.author.id;
        if(!message.member.hasPermission(['MANAGE_MESSAGES', 'MANAGE_GUILD'])) return message.channel.send('You dont have manage messages/manage server permission.')

let simple = "React with 🎉 to join the giveaway!";
let msg = "";
  let chn = await bot.awaitReply(message, "Giveaway Setup • 1/7", `What channel do you want this giveaway in?\n> Please mention a channel or provide its ID.`, `Reply with \"cancel\" to stop the process`, filter);
    if (!chn) return message.channel.send("Cancelled you have no time left!");
    if (chn === "cancel") return message.channel.send("Cancelled");
    chn = chn.replace("<", "").replace("#", "").replace(">", "");
    let channel = message.guild.channels.cache.find((c) => c.id === chn);
        if(!channel) return message.channel.send('Please specify a valid channel')

  let duration = await bot.awaitReply(message, "Giveaway Setup • 2/7", "How long do you want the giveaway to last?\n> Please enter the duration of the giveaway. You can use `s` for seconds, `m` for minutes, `h` for hours", `Reply with \"cancel\" to stop the process`, filter);
    if (!duration) return message.channel.send("Cancelled you have no time left!");
    if (duration === "cancel") return message.channel.send("Cancelled");

        if(
            !duration.endsWith('d') &&
            !duration.endsWith('h') &&
            !duration.endsWith('m') &&
            !duration.endsWith('s')
          )
            return message.channel.send('Please specify a valid duration. You need to use d (days), h (hours), m (minutes) , s (seconds)')

  let winners = await bot.awaitReply(message, "Giveaway Setup • 3/7", `How many winners will there be?\n> Please enter a number between 1 and 10.`,`Reply with \"cancel\" to stop the process`, filter);
    if (!winners) return message.channel.send("Cancelled you have no time left!");
    if (winners === "cancel") return message.channel.send("Cancelled");
        winners = parseInt(winners); 
        if(![1,2,3,4,5,6,7,8,9,10].includes(winners) || !winners || isNaN(winners) || winners === null) return message.channel.send('Please specify a valid amount of winners.(It must be a number | Min: 1 | Max: 10)');

  let prize = await bot.awaitReply(message, "Giveaway Setup • 4/7", `What will you be giving away?\n> Please enter the giveaway prize.`,`Reply with \"cancel\" to stop the process`, filter);
    if (!prize) return message.channel.send("Cancelled you have no time left!");
    if (prize === "cancel") return message.channel.send("Cancelled");

  
        

let gui = await bot.awaitReply(message, "Giveaway Setup • 5/7", `Do you want the giveaway participants to be in a server?\n> Please provide a permanent invite link to the guild that users should join. Due to Discord's TOS we cannot force users to be in the server but however we can suggest them to join the server. Reply with \"none\" if you do not want this to be a requirement.`,`Reply with \"cancel\" to stop the process`, filter);
    if (!gui) return message.channel.send("Cancelled you have no time left!");
    if (gui === "cancel") return message.channel.send("Cancelled");
let guild;
if(gui.toLowerCase() !== "none") {
 guild = await bot.fetchInvite(gui).catch(err => null)

        if(!guild || !guild.guild || !guild.guild.id || !bot.guilds.cache.get(guild.guild.id)) return message.channel.send('I am not in that server or that invite is invalid.')
msg += `\nYou are suggested to join **[${guild.guild.name}](${guild.url})** server!`;

}

else guild = undefined;

  let messages = await bot.awaitReply(message, "Giveaway Setup • 6/7", `How many messages sent are required to join this giveaway?\n> Please enter the amount of messages. Reply with \"none\" if you do not want this to be a requirement.`, `Reply with \"cancel\" to stop the process`,filter);
    if (!messages) return message.channel.send("Cancelled you have no time left!");
    if (messages === "cancel") return message.channel.send("Cancelled");
let msgs;
if(messages.toLowerCase() !== "none") {
       messages = parseInt(messages) 
        if(!messages || isNaN(messages) || messages === null) return message.channel.send('Please specify a valid amount of winners.(It must be a number)');
msgs = messages;
msg += `\nYou must have sent **${msgs}** messages in the server to enter!`;

} else msgs = undefined;
    

let rol = await bot.awaitReply(message, "Giveaway Setup • 7/7", "What roles do users need to join the giveaway?\n> Please seperate role \`IDs\` or \`@role\` with a space. Reply with \"none\" if you do not want this to be a requirement.",`Reply with \"cancel\" to stop the process`, filter);
    if (!rol) return message.channel.send("Cancelled you have no time left!");
let roles;
if(rol.toLowerCase() !== "none") {
    if (rol === "cancel") return message.channel.send("Cancelled");

  
   roles = [];
  rol.split(" ").forEach(role => {
   let check = message.guild.roles.cache.find(r => r.id === role.replace("<", "").replace("@", "").replace(">", "").replace("&", ""));
   if(check) roles.push(check);
  })
   if(roles.length) {
msg += `\nYou must have **one** of these roles: ${roles.map(r => r.toString()).join(", ")} to enter!`} else { roles = undefined;
message.channel.send('Please specify valid roles');
return;
}
} else roles = undefined;
  

bot.giveaways.start(channel, {
            time : ms(duration),
            prize : prize,
            winnerCount: winners,
            hostedBy: message.author ,
            messages: {
                giveaway:"🎉 **GIVEAWAY** 🎉",
                giveawayEnded: "🎉 **GIVEAWAY ENDED** 🎉",
                timeRemaining: "Time Remaining: **{duration}**",
inviteToParticipate: simple, 
               winMessage: `Congratulations {winners}, you have won the **${prize}** giveaway!\n{messageURL}` ,        embedFooter: "Ends At",
                noWinner: "No valid participations, no winners can be chosen!", 
                hostedBy: `Hosted by: {user}\n\n${msg}`,
                winners: "Winner(s)",
                endedAt: 'Ended at',
                units: {
                    seconds: "seconds",
                    minutes: "minutes",
                    hours: 'hours',
                    days: 'days',
                    pluralS: false
                }
            },
extraData: {
roles: roles || undefined, 
guild: guild || undefined, 
messages: messages || undefined

}
           
        })
        .catch(err => {
            console.log(err)
           return message.channel.send(`Error while starting the giveaway: \`${err}\``)
        })

        message.channel.send(`Giveaway is starting in ${channel}`)  
       
    }
}
