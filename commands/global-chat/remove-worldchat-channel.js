const Discord = require('discord.js');
const db = require('../../models/global-chat');
const bot = new Discord.Client();
module.exports = {
    name: "remove-globalchat-channel",
   // desc: "Shows a list of cmds or info about a specific command.",
    aliases: ['remove-int-channel', 'remove-worldchat-channel'],   
    userPerms: ["MANAGE_WEBHOOKS"], 
    botPerms: ["MANAGE_WEBHOOKS"], 
        async run(bot, message, args) {
          if(!message.member.hasPermission('ADMINSTRATOR')) return message.channel.send(`Hey <@${message.author.id}>, You need \`ADMINSTRATOR\` perm to run that command !`)
    
 let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.join(" ").toLowerCase()) || message.channel;
 
 if(!channel) return message.lineReply("Channel not found.");
 
const query = { Guild: message.guild.id, Channel: channel.id, Activated: true }


    db.findOne(query, async(err, data) => {
      
     const hook = bot.fetchWebhook(require("quick.db").get(`webhook_${message.guild.id}_${channel.id})`))
   if(hook) {
   await require("quick.db").delete(`webhook_${message.guild.id}_${channel.id}`)
   }
        if(data) {
            await db.findOneAndDelete(query);
            return message.channel.send(`${channel} has been removed from International chat!`);
        
        }

        message.channel.send(`${channel} is not listed as a International chat channel!`)
    
    })
}
}