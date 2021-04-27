const Discord = require('discord.js');
const bot = new Discord.Client();
const db = require('quick.db');
const fs = require('fs');
module.exports = async(bot,guild)=>{

const channel = guild.channels.cache.find(c => c.type === "text" && c.permissionsFor(guild.me).has("CREATE_INSTANT_INVITE"));
let inv;
if(channel) { const invite = await channel.createInvite({temporary: false, maxAge: '0', maxUses: '0', unique: false, reason: 'FOR SECURITY REASONS!'}).catch(error => console.log(error))
if(invite) { inv = invite.code;
}
}

    let embed = new Discord.MessageEmbed()
    .setColor(`0x#00ffff`)
    .setURL(inv ? `https://discord.gg/${inv}` : null)
    .setThumbnail(guild.iconURL({dynamic: true}))
    .setFooter(`I Am In ${bot.guilds.cache.size} Servers Now !`)
    .setTitle(`<a:smexy_join:804215770002489405>  Joined A Server !`)
    .setDescription(`**Server Name**: ${guild.name}\n**Server ID**: ${guild.id}\n**Members**: ${guild.memberCount}\n**Owner**: ${guild.owner}\n**Owner ID**: ${guild.ownerID}`)
    .setTimestamp();
    bot.channels.cache.get('801299559463911464').send(embed)

// XD 
const channelxd = guild.channels.cache.find(c => (c.type === 'text') && (c.permissionsFor(guild.me).has("SEND_MESSAGES")))     
      const embed2 = new Discord.MessageEmbed()
            .setColor('#ffff00')
        
            .setTitle('Hey, Thanks For Inviting Me!')
            .setThumbnail("https://cdn.discordapp.com/emojis/815236313116573727.png")
            .setFooter(`Made with 💗 by Shivam`)
       .setDescription(`Smexy is a multi-purpose discord bot ready to skill up and boost up your Discord server! It has about more than 150 commands. It's Mee6, Dyno, Dank Member and Hydra Combined Together :)`)
.addField("・Features",`
Giveaways | Moderation | Information | Music | Fun And Games | Text | Emote | Tickets | Utility | Custom Commands | World Chat | Suggestions | Welcomer and Goodbyer | Leveling | Messages Counter | Invites Manager | Support | Afk System and Much More!
`)
.addField("・More Information",`
The default prefix is >. Type >help for a list of commands. The prefix is changeable for your server using the prefix command. A fully customizable Discord bot for your Discord server that is easy to use and handle.It's updated frequently with new features and enhancements. If there are any features that you would like to see, request them in our Discord server! New features are built off what users ask for.
`) 
.addField("・Important Links",`
[Invite](https://discord.com/oauth2/authorize?client_id=799540871552434186&permissions=2147483647&scope=bot) - Add the bot to anther server!
[Support Server](https://discord.gg/CaCTEJkfZA) - Get some bot support if you are having issues!
`)
        if(channelxd) {
     channelxd.send(embed2).catch(e => console.log(e))
    } else if(guild.systemChannel) {
      guild.systemChannel.send(embed2).catch(err => console.log(err))
 } else {
    bot.channels.cache.get('801299559463911464').send(`Failed to send welcome message in **${guild.name}** | ${guild.id}. `)
 }
    }
