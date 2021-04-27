const permissions = {
ADMINISTRATOR:"Administrator", 
CREATE_INSTANT_INVITE:"Create Instant Invite", 
KICK_MEMBERS:"Kick Members", 
BAN_MEMBERS:"Ban Members", 
MANAGE_CHANNELS:"Manage Channels", 
MANAGE_GUILD:"Manage Server", 
ADD_REACTIONS:"Add Reactions", 
VIEW_AUDIT_LOG:"View Audit Log", 
PRIORITY_SPEAKER:"Priority Speaker", 
STREAM:"Stream", 
VIEW_CHANNEL:"View Channel", 
SEND_MESSAGES:"Send Messages", 
SEND_TTS_MESSAGES:"Send TTS Messages", 
MANAGE_MESSAGES:"Manage Messages", 
EMBED_LINKS:"Embed Links", 
ATTACH_FILES:"Attach Files", 
READ_MESSAGE_HISTORY:"Read Message History", 
MENTION_EVERYONE:"Mention Everyone", 
USE_EXTERNAL_EMOJIS:"Use External Emojis", 
VIEW_GUILD_INSIGHTS:"View Server Insights", 
CONNECT:"Connect", 
SPEAK:"Speak", 
MUTE_MEMBERS:" Move Members",
DEAFEN_MEMBERS:"Deafen Members", 
MOVE_MEMBERS:"Move Members", 
USE_VAD:"Use VAD", 
CHANGE_NICKNAME:"Change Nickname", 
MANAGE_NICKNAMES:"Manage Nicknames", 
MANAGE_ROLES:"Manage Roles", 
MANAGE_WEBHOOKS:"Manage Webhooks", 
MANAGE_EMOJIS:"Manage Emojis", 
}

module.exports = async(bot,oldRole, newRole) => {
const { MessageEmbed } = require("discord.js");
const guild = newRole.guild;
 if (!guild.me.hasPermission("MANAGE_WEBHOOKS")) return;
    const w = await guild.fetchWebhooks();
    const log = w.find((w) => w.name === "Smexy Logger");
if(log) {
let embed = new MessageEmbed() 
.setTitle("Role Updated") 
.setDescription(`${newRole.toString()} was updated`)
.setColor("BLUE") 
.setFooter(`Role ID: ${newRole.id}`)
        .setTimestamp();
    if (oldRole.name != newRole.name) {
     embed
.addField(`❯ Old Role Name`, oldRole.name) 
.addField(`❯ New Role Name`, newRole.name);
    }

    if (oldRole.color != newRole.color) {
   embed
.addField(`❯ Old Role Colour`,`${oldRole.color} ([${
            oldRole.hexColor
          }](https://www.color-hex.com/color/${oldRole.hexColor.slice(1)}))`) 
.addField(`❯ New Role Colour`,`${newRole.color} ([${
            newRole.hexColor
          }](https://www.color-hex.com/color/${newRole.hexColor.slice(1)}))`) 
   
    }
    
    if((oldRole.hoisted && !newRole.hoisted) || (!oldRole.hoisted && newRole.hoisted)) {
      embed.addField(`❯ Old Role was hoisted ?`, oldRole.hoisted ? "Yes" : "No")
      embed.addField(`❯ New Role is hoisted ?`, newRole.hoisted ? "Yes" : "No")
    }
    if((oldRole.mentionable && !newRole.mentionable) || (!oldRole.mentionable && newRole.mentionable)) {
      embed.addField(`❯ Old Role was mentionable ?`, oldRole.mentionable ? "Yes" : "No")
      embed.addField(`❯ New Role is mentionable?`, newRole.mentionable ? "Yes" : "No")
    }
   if(oldRole.rawPosition != newRole.rawPosition) {
  embed
  .addField(`❯ Old Role Position`, oldRole.rawPosition) 
    .addField(`❯ New Role Position`, newRole.rawPosition) 
}
    if (oldRole.permissions.bitfield != newRole.permissions.bitfield) {
  
       embed.addField("❯ Old Role Permissions", oldRole.permissions.bitfield)
        .addField("❯ New Role Permissions", newRole.permissions.bitfield)
const old = oldRole.permissions.toArray(); 
const New = newRole.permissions.toArray() 
const test = old.filter(perm => New.indexOf(perm) < 0);
const testing = New.filter(perm => old.indexOf(perm) < 0);
if(testing.length) embed.addField("❯ Allowed Permissions",testing.map(p => permissions[p]).join(", ")) // added
if(test.length) embed.addField("❯ Denied Permissions",test.map(p => permissions[p]).join(", ")) // removed 
  embed.addField(`\u200b`,`**[What those numbers mean ?](https://discordapp.com/developers/docs/topics/permissions)**`)
     
    }
return log.send({
username: "Smexy", 
avatarURL: " https://cdn.discordapp.com/emojis/815236313116573727.png", 
embeds: [embed]
})

  }
}
