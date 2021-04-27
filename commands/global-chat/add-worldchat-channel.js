const Discord = require('discord.js');
const db = require('../../models/global-chat');
const bot = new Discord.Client();

module.exports = {
    name: "add-worldchat-channel",
  //  desc: "Shows a list of cmds or info about a specific command.",
    aliases: ['add-globalchat-channel', 'add-int-channel'],
    userPerms: ["MANAGE_WEBHOOKS"], 
    botPerms: ["MANAGE_WEBHOOKS"], 
        async run(bot, message, args) {
        if(!message.member.hasPermission('ADMINSTRATOR')) return message.channel.send(`Hey <@${message.author.id}>, You need \`ADMINSTRAT\` perm to run that command !`)
  
   let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.join(" ").toLowerCase()) || message.channel;
 
 if(!channel) return message.lineReply("Channel not found.");
 
    db.findOne({ Guild: message.guild.id, Channel: channel.id, Activated: true }, async(err, data) => {
        if(data) return message.channel.send(`${channel} already has been listed as an International chat channel!`)
        
    data = new db({

        Guild: message.guild.id,
        Channel: channel.id,
        Activated: true, 

    })    
    data.save();
    await channel.createWebhook("Smexy Bot | World Chat", { reason: `World Chat : ${message.author.tag} (ID:${message.author.id})`}).then(async hook => { require("quick.db").set(`webhook_${message.guild.id}_${message.channel.id}`,`${hook.id}`)})
    message.channel.send(`${channel} has been added to the International chat!`)
    })

    
        }
        }