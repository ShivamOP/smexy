



const { MessageEmbed, MessageCollector } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
name: "delete-counter", 
aliases: [], 
time: 10000,
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
                .setDescription(`Which type of counter do you want to create? \`${result.join("\`, \`")}\` or type \`cancel\` to cancel the command.`)
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
let testing = db.get(`stats_${message.guild.id}_${data}`)

if(testing === null) return ms.edit(new MessageEmbed() .setColor("BLUE") .setDescription(`**${data}** counter is not **on**.`)
)
// else { return message.channel.send(`An Error occurred. Please report it to my support server. **|** \`${prefix}support\``)
// }
let g = message.guild;


/////////// Name //////////
message.guild.channels.cache.get(db.get(`stats_${message.guild.id}_${data}`)).delete("Server Stats System").then(c => { db.delete(`stats_${message.guild.id}_${data}`)
})
ms.edit(new MessageEmbed()
.setColor("BLUE") .setDescription(`Turned the **${msg.content.toLowerCase()}** counter **off**.`))
    collector.stop()
              }
              
              
              
           
})




}
}


