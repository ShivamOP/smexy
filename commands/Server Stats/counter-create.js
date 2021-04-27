
const { MessageEmbed, MessageCollector } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
name: "create-counter", 
time: 10000,
aliases: ["counter-create"], 
async run(bot, message, args,prefix) {

const result = [
`members`, 
`humans`, 
`bots`, 
`channels`, 
`category`, 
`text`, 
`voice`, 
`boosts`, 
`tier`, 
`roles`, 
`bans`, 
`online`, 
`offline`, 
`dnd`, 
`idle`, 
`emojis`,
`static`, 
`animated`
]
const r = result;


    if(!message.member.hasPermission('ADMINISTRATOR'||'MANAGE_GUILD')) return message.channel.send('You need administrator permissions to use this command')
   
const cat = db.get(`stats_${message.guild.id}`)
const c = message.guild.channels.cache.get(cat)
if(!c) return message.channel.send(`First setup the server stats by typing \`${prefix}setup\` , before using this command.`) 
const filter = m => m.author.id === message.author.id;
let data;
let type;
            const embed = new MessageEmbed()
             //   .setTitle('Server Stats Setup')
                .setDescription(`Which type of counter do you want to create? \`${result.join("\`, \`")}\` or type cancel to \`cancel\` the command.`)
                .setColor('BLUE');
        let ms = await message.channel.send(embed);
    const channels = [];      

            const collector = new MessageCollector(message.channel, filter, { max: 1 });

            collector.on('collect', async msg => {
                
  
   if(msg.content.toLowerCase() === "cancel") {
  await message.channel.send(`Process Cancelled.`);
  await collector.stop();
  return;
} 
if(!result.includes(msg.content.toLowerCase())) {
   
return message.channel.send(`Wrong counter type. Please try again.`) 
collector.stop();
}
else {
data = msg.content.toLowerCase();      
      


   ms.edit(new MessageEmbed() .setColor("BLUE") .setDescription(`Which type of channel do you want to use as a counter? \`voice\` , \`text\` or type \`cancel\` to cancel the setup.`)
   )
  

      collector.stop()
}
       const second = new MessageCollector(message.channel, filter, { max: 1 });

            second.on('collect', async msgg => {
const types = ["text", "voice"]
if(msgg.content.toLowerCase() === "cancel") { return message.channel.send(`Process cancelled`)
second.stop() 
}
if(!types.includes(msgg.content.toLowerCase())) { return message.channel.send(`Wrong channel type. Please try again.`) 
second.stop() 
} else {
type = msgg.content.toLowerCase();
let testing = db.get(`stats_${message.guild.id}_${data}`)

if(testing !== null && message.guild.channels.cache.get(testing)) return ms.edit(new MessageEmbed() .setColor("BLUE") .setDescription(`**${data}** counter is already **on**.`)
)
// else { return message.channel.send(`An Error occurred. Please report it to my support server. **|** \`${prefix}support\``)
// }
const bansCount = await message.guild.fetchBans();
let g = message.guild;
let rm;
if(data === r[0]) rm = `Members: ${g.members.cache.size}`
if(data === r[1]) rm = `Humans: ${g.members.cache.filter(m => !m.user.bot).size}`
if(data === r[2]) rm = `Bots: ${g.members.cache.filtrr(m => m.user.bot).size}`
if(data === r[3]) rm = `Channels: ${g.channels.cache.size}`;
if(data === r[4]) rm = `Category: ${g.channels.cache.filter(c => c.type === 'category').size}`;
if(data === r[5]) rm = `Text: ${g.channels.cache.filter(c => c.type !== 'voice' && c.type !== 'category').size}`
if(data === r[6]) rm = `Voice: ${g.channels.cache.filter(c => c.type === 'voice').size}`;
if(data === r[7]) rm = `Boosts: ${g.premiumSubscriptionCount}`
if(data === r[8]) rm = `Tier: ${g.premiumTier}`;
if(data === r[9]) rm = `Roles: ${g.roles.cache.size}`;
if(data === r[10]) rm = `Bans: ${bansCount.size}`;
if(data === r[11]) rm = `Online: ${g.members.cache.filter(m => m.user.presence.status === "online").size}`;
if(data === r[12]) rm = `Offline: ${g.members.cache.filter(m => m.user.presence.status === "offline").size}`;
if(data === r[13]) rm = `DND: ${g.members.cache.filter(m => m.user.presence.status === "dnd").size}`;
if(data === r[14]) rm = `Idle: ${g.members.cache.filter(m => m.user.presence.status === "idle").size}`;
if(data === r[15]) rm = `Emojis: ${g.emojis.cache.size}`;
if(data === r[16]) rm = `Static: ${g.emojis.cache.filter(e => !e.animated).size}`;
if(data === r[17]) rm = `Animated: ${g.emojis.cache.filter(e => e.animated).size}`;

/////////// Name //////////
message.guild.channels.create(rm, { type: type, parent: cat, reason: "Served Stats System"}).then(c => { db.set(`stats_${message.guild.id}_${data}`, c.id)
})
ms.edit(new MessageEmbed()
.setColor("BLUE") .setDescription(`Turned the **${msg.content.toLowerCase()}** counter **on** as a **${type}** channel.`))

              }
              
              
              
            })
})




}
}
