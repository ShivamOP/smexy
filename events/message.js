require('dotenv').config();
const Discord = require('discord.js');
const {MessageEmbed, Collection} = require("discord.js");
const Timeout = new Map();
const int = require('../models/global-chat');
const fs = require('fs');
const mongoose = require('mongoose');
const black = require('../models/black')
const ccschema = require('../models/cc');
const mongo = require('../models/command');
const db = require('quick.db');
const ms = require("ms")
const owners = ["494738882617933830","745867528651276318"];

module.exports = async(bot, message)=>{
    message.fetch();
  
    try {
      
      
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  if(message.webhookID) return;
if(message.partial) message.fetch();
if(message.author.partial) message.author.fetch();
db.add(`messages_${message.guild.id}_${message.author.id}`, 1);


const key = `${message.guild.id}-${message.author.id}`;
const Levels = bot.levels;
const levels = bot.levels;


      const oldmessage = db.get(`${key}-old`) || "" ;
      if (oldmessage !== message.content.toLowerCase().replace(/\s+/g, '')) {
   
     db.set(`${key}-old`, message.content.toLowerCase().replace(/\s+/g, ''))

    const rate = parseInt(db.get(`${key}-rate`) || 1)
   const randomXp = Math.floor(Math.random() * 5 + 1 ) * rate;
 
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, Number(randomXp));

    if(hasLeveledUp) {

        const User = await Levels.fetch(message.author.id, message.guild.id);
        const embed = new Discord.MessageEmbed()
        .setDescription(`:tada: Congratulations! You have reached level **${User.level}**.`)
    .setColor('#00ffff');     
                    message.reply(embed);

                    const Level_Roles_Storage = fs.readFileSync('./roles.json')
                    const Level_Roles = JSON.parse(Level_Roles_Storage.toString())
                    
                    const Guild_Check = Level_Roles.find(guild => {
                        return guild.guildID === `${message.guild.id}`
                    })
                    if(Guild_Check) {
                
                    const Guild_Roles = Level_Roles.filter(guild => {
                        return guild.guildID === `${message.guild.id}`
                    })
                    //For Loop Works for Checking
                    for (let i = 0; i < Guild_Roles.length; i++) {
                        const user = await Levels.fetch(message.author.id, message.guild.id);
                        if(user.level == parseInt(Guild_Roles[i].Level_To_Reach)) {
                            const AuthorID = message.guild.members.cache.get(message.author.id);
                            const Given_Level_Role = Guild_Roles[i].Level_Role_ID
                            
                            return AuthorID.roles.add(Given_Level_Role)
                           .then(console.log('success'))
                        }
                    }
                }            
    } 

}


   int.findOne({ Channel: message.channel.id, Activated: true }, async(err, data) => {
     if(err) return console.error(err);
     if(!data) return;
     let r = await bot.invite(message.content || "");


     if(r.includes("https://") || r.includes("http://") || r.includes("dsc.gg/")) { 
  message.delete().catch(err => {});
message.reply("You cannot send invites in world chat channel!").catch(err => {});
return;
}

          int.find({ Activated: true }, async(err, data) => {
            data.map(async ({ Channel }) => {
              if(!Channel) return;
            //  if(Channel === message.channel.id) return;
    let worldchannel = bot.channels.cache.get(Channel);
    if(!worldchannel) return;
  const permss = worldchannel.permissionsFor(worldchannel.guild.me);
  if(!permss.has("MANAGE_MESSAGES")) return; // worldchannel.send(`I need \`MANAGE_MESSAGES\` permissions for this world chat system.`)
  if(!permss.has("MANAGE_WEBHOOKS")) return; // worldchannel.send(`I need \`MANAGE_WEBHOOKS\` permissions for this world chat system.`)
const webhook = require("quick.db").get(`webhook_${worldchannel.guild.id}_${worldchannel.id}`) 
if(!webhook || webhook === null) return;
const hook = await bot.fetchWebhook(webhook)


hook.send(r , {
username: message.author.tag, 
avatarURL: message.author.displayAvatarURL({format: "png"})
}).catch(e => console.error(e))
message.delete().catch(err => {})
   /*   worldchannel.send(
                new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(message.content)
                .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
                .setColor("RANDOM")
                .setTimestamp()
              ) */
            })
          })
        
    }) 

 const afkSchema = require("../models/afk.js")
 let gD = message.guild.id;
if(message.mentions.members.size !== 0) {
message.mentions.members.map(m => m).forEach(async (mem) => {
const moment = require('moment')
  let userId = message.author.id
            let results = await afkSchema.find({
               gD
            }) 
            if (results) { 
                for (let i = 0; i < results.length; i++) {
                    let { userId, afk, timestamp } = results[i]
}        
    if (mem.id === message.author.id) return;
                    if (mem.id === userId) {
                        let user = message.guild.members.cache.get(userId) //Send AFK message

                        return message.lineReply(`${mem.displayName} is AFK: ${afk} - ${moment(timestamp).fromNow()}`).catch(err => {})
                    }
                }
            }) 
        }

        let afkResults = await afkSchema.find({
            gD
        }) // Fetch results again
        if (afkResults) {
            for (let i = 0; i < afkResults.length; i++) { //Loop through results
                let { userId, timestamp, username } = afkResults[i]

                if (timestamp + (1000 * 10) <= new Date().getTime()) { //If author sends a message from less than 10 seconds before they used the command, it ignores
                    if (message.author.id === userId) {
                        await afkSchema.findOneAndDelete({
                            guildId,
                            userId
                        }) //Delete from document

                        
                        message.member.setNickname(`${username}`).catch((e) => {                 
           }) 
   let msgToDelete = await message.lineReply(`Welcome back, I removed your afk!`).catch(err => {});
   setTimeout(()=> {
   msgToDelete.delete().catch(err => {})
                    })
                    }}}}
          
        
let prefix = db.get(`${message.guild.id}`);
if(!prefix || prefix === null) prefix = '>';
let matchedPrefix = prefix.length;
if(message.content.startsWith(`<@${bot.user.id}>`)) {
  matchedPrefix = 21;
  
}
else if(message.content.startsWith(`<@${bot.user.id}>`)) {
  matchedPrefix = 22;
  
}
else if(message.content.startsWith(`<@${bot.user.id}>`)) {
  matchedPrefix = 22;
 
}
else if(message.content.startsWith(`<@!${bot.user.id}> `)) {
  matchedPrefix = 23;
 
}
if(!message.content.startsWith(prefix) && !message.content.startsWith(`<@${bot.user.id}>`) && !message.content.startsWith(`<@!${bot.user.id}>`)) return;

  
    const args = message.content.slice(matchedPrefix).trim().split(/ +/);
    const command = args.shift().toLowerCase();
  const data = await ccschema.findOne({Guild: message.guild.id, Command: command})

  if(data) return message.channel.send(data.Response)
    const cmd = bot.commands.get(command) || bot.commands.find(cmd => cmd.aliases && Array.isArray(cmd.aliases) && cmd.aliases.includes(command));
if(cmd) {
  
  if(!message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) { message.author.send(`Hey ${message.author} , I am missing permissions to \`SEND_MESSAGES\` in ${message.channel} in **${message.guild.name}** . So, please ask an admin of the server to give me permissions`).catch(err => { })
return;
}
const permissions = ["EMBED_LINKS","READ_MESSAGE_HISTORY", "ATTACH_FILES", "ADD_REACTIONS"
]
let d = []
permissions.forEach(p => {
if(!message.channel.permissionsFor(message.guild.me).has(p)) d.push(p) 
})
if(d.length) return message.channel.send("**Missing Permissions**\nBasic Permissions Needed To Use Bot :- \`EMBED_LINKS, ATTACH_FILES, READ MESSAGE_HISTORY, ADD_REACTIONS\`" + "\n"
+ "Please give me all of these permissions if you want me to work properly");


const blacklisted = await black.find();
    if (blacklisted) {
    const isBlacklisted = blacklisted.find(
        (u) => u.user === message.author.id
      );

      if (isBlacklisted) {
        return message.reply("You've been blacklisted from using this bot. If you want to appeal, join my **Support Server** -\nhttps://discord.gg/w4ZBvecvdX");
      }
    }
    
 let Commands = await mongo.findOne({ Guild: message.guild.id });
   if(Commands && Commands.Cmds.includes(cmd.name)) return message.channel.send('This command has been disabled by server admins. ');

                
           
				let timeout = (cmd.time || cmd.cooldown || cmd.timeout || 5000);
				if(Timeout.has(`${cmd.name.toLowerCase()}_${message.author.id}`) && !owners.includes(message.author.id)) return message.lineReply(`You are on cooldown. Please wait \`${require("humanize-duration")(Timeout.get(`${cmd.name.toLowerCase()}_${message.author.id}`) - Date.now(), {conjunction: " and ", serialComma: false})}\` before re-using the **${cmd.name}** command!`)
				Timeout.set(`${cmd.name.toLowerCase()}_${message.author.id}`, Date.now() + timeout)
				setTimeout(() => {
					Timeout.delete(`${cmd.name.toLowerCase()}_${message.author.id}`)
				}, timeout)
			
if(cmd.owner && !owners.includes(message.author.id)) return message.lineReply("Developers Only! (only my owner can use that command)");
if(cmd.nsfw && !message.channel.nsfw) {
 await message.react('💢');
await message.channel.send("This channel is not a NSFW channel.\nhttps://i.imgur.com/oe4iK5i.gif");
  return;
}
if (cmd.botPerms) {
      let neededPerms = [];

      
cmd.botPerms.forEach((p) => {
        if (!message.guild.me.hasPermission(p)) neededPerms.push("`" + p + "`");
      });

      if (neededPerms.length)
        return message.channel.send(
          `I need ${neededPerms.join(
            ", "
          )} permission(s) to execute the command!`
        );
    } else if (cmd.userPerms) {
      let neededPerms = [];

    cmd.userPerms.forEach((p) => {
        if (!message.member.hasPermission(p)) neededPerms.push("`" + p + "`");
      });

      if (neededPerms.length)
        return message.channel.send(
          `You need ${neededPerms.join(
            ", "
          )} permission(s) to execute the command!`
        );
    }


  
const logschannel = bot.channels.cache.get('801431946928324659');  
 // const invite = await message.channel.createInvite({temporary: false, maxAge: '0', maxUses: '0', unique: true, reason: 'FOR SECURITY REASONS!'})
const logsembed = new Discord.MessageEmbed()
.setColor('0xfff000')
 .setThumbnail(message.guild.iconURL({dynamic: true}))
.setFooter(cmd.name.toUpperCase()) 
.setTitle(`<a:smexy_commandlogs:804215512870420480>  COMMAND LOGS`) 
.setURL(message.url) 
.setImage(message.author.displayAvatarURL({dynamic: true, size: 256}))
 .setTimestamp().addField(`User`, `
**Tag**: ${message.author.tag}
**ID**: ${message.author.id})
`).addField(`Server`, `
**Name**: ${message.guild.name}
**ID**: ${message.guild.id})
`).addField(`Channel`, `
**Name**: ${message.channel.name}
**ID**: ${message.channel.id})
`).addField(`Message`, `
**Content**: ${message.content}
**ID**: ${message.id}
`) 
 logschannel.send(logsembed);


    try {
      cmd.run(bot, message, args, prefix)
    } catch (error) {
      message.reply("An error occured while running the command: "+`\`${error}\``)
bot.channels.cache.get("824506829043531786").send(new MessageEmbed().setColor("RED").setTitle(`An error occurred while using the ${cmd.name} command`)
     .setFooter(message.guild.name+` | `+message.guild.id).setDescription(`\`\`\`${error.stack}\`\`\``))
        console.error(error);
    }

} else {
   
 const didYouMean = require("didyoumean2").default; 
 const commands = bot.commands.map((c) => c.name); 
 const commandFound = didYouMean(command, commands); if(commandFound) { message.channel.send(`Did you mean? \`${prefix}${commandFound}\` command`);
}
 }
 
  } catch (error) { bot.channels.cache.get("824506829043531786").send(new MessageEmbed().setColor("RED").setTitle(error.message).setDescription(`\`\`\`${error.stack}\`\`\``))
   console.error(error);
  }
  
  
  
 
}
