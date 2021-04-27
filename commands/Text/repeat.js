const Discord = require('discord.js');

const bot = new Discord.Client();

module.exports = {
    name: "repeat",
    desc: "Shows a list of cmds or info about a specific command.",
    aliases: [],
    
        async run(bot, message, args){
const database = require('../../database');
            const prefix = database[`${message.guild.id}`]["prefix"];
            if(!prefix) prefix = '>';
        
        if(!args[0] && !args[1]) {
         const emb = new Discord.MessageEmbed() 
         .setColor('0x#ff0000')
        .addField(`Usage:`,`\`${prefix}reapet <no_of_times> <text>\``) 
        .addField(`Example:`,`\`${prefix}repeat 10 Test Command XD !\``)
        message.channel.send(emb)
      } 
        
       else { const text = args.slice(1).join(" ");
          const textlol = args[0]
          const textxd = text.repeat(textlol)
          message.channel.send(textxd) 
       }
         } 
        

}
