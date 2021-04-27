const Discord = require('discord.js');
const db = require("quick.db");
const { MessageEmbed, MessageCollector } = require("discord.js");
module.exports = {
name: "setup",
time: 30000,
aliases: [], 
async run(bot, message, args, prefix) {
    if(!message.member.hasPermission('ADMINISTRATOR'||'MANAGE_GUILD')) return message.channel.send('You need administrator permissions to use this command')
   
const data = db.get(`stats_${message.guild.id}`)
const c = message.guild.channels.cache.get(data)
if(c) return message.channel.send(`The bot already finished the setup in your server, use \`${prefix}reset\` to do a reset the server stats setup.`) 
const filter = m => m.author.id === message.author.id;
let type;
            const embed = new MessageEmbed()
                .setTitle('Server Stats Setup')
                .setDescription(`Which type of channel do you want to use as a counter? \`voice\` , \`text\` or type \`cancel\` to cancel the setup.`)
                .setColor('BLUE');
        let ms = await message.channel.send(embed);
    const channels = [];      

            const collector = new MessageCollector(message.channel, filter, { max: 1 });

            collector.on('collect', async msg => {
                let result = ["voice", "text"]
  
   if(msg.content.toLowerCase() === "cancel") {
  await message.channel.send(`Setup Cancelled.`);
  await collector.stop();
  return;
} 
if(!result.includes(msg.content.toLowerCase())) {
   // console.log(msg)
   
return message.channel.send(`Wrong channel type. Please try again.`) 
collector.stop();
}
else {
type = msg.content.toUpperCase();
//db.set(`stats_${message.guild.id}_type`, type)
               
 
         let c1, 
         c2, 
         c3;

        message.react("✅")
        try {
ms.edit("Operation started! Please wait ..........", {embed: null}) 
 
        message.guild.channels.create(`📊 SERVER STATS 📊`, {type: 'category'})
    .then(parent => {
    parent.setPosition(0)
db.set(`stats_${message.guild.id}`, parent.id)
        Promise.all([
            message.guild.channels.create(
                `Members: ${message.guild.members.cache.size}`,
                {type: type, 
                parent, 
                reason: "Server Stats System"
        ,        permissionOverwrites: [
                    {id: message.guild.id, deny: ['CONNECT']},
                ]}
            ).then(async m => {
             db.set(`stats_${message.guild.id}_members`, `${m.id}`) 
            }),
            message.guild.channels.create(
                `Humans: ${message.guild.members.cache.filter(member => !member.user.bot).size}`,
                {type: type, 
                parent, 
               reason: "Server Stats System",
               permissionOverwrites: [
                    {id: message.guild.id, deny: ['CONNECT']},
                ]}
            ).then(async m => {
          db.set(`stats_${message.guild.id}_humans`,`${m.id}`);
            }),
            message.guild.channels.create(
                `Bots: ${message.guild.members.cache.filter(member => member.user.bot).size}`,
                {type: type,  
                parent, 
               reason: "Server Stats System", permissionOverwrites: [
                    {id: message.guild.id, deny: ['CONNECT']},
                ]}
            ).then(async m => { 
    db.set(`stats_${message.guild.id}_bots`, `${m.id}`) 
            }),
        ])
 }   )
    .then(async () => {
      
   
   ms.edit("Setup Completed", new MessageEmbed()
   .setColor("BLUE")
   //.setDescription(`Setup Completed.`)
   .addField("Create Counters",`\`${prefix}create-counter\``)
   .addField("Delete Counters",`\`${prefix}delete-counter\``)
   .addField("Counters List", `\`${prefix}counters-list\``)
   )
   } )
} catch (error) {
         message.reply("ERROR: "+error)   
         console.error(error)
}
collector.stop()
}
}) 
}
}