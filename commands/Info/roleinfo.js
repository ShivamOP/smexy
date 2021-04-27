const moment = require('moment');
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

module.exports = {
name: "roleinfo", 
aliases: ["role-info"], 
async run(bot, message, args) {
    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(" ").toLowerCase());
    if (!role)
      return message.channel.send('Please mention a role or provide a valid role ID or name.');
const { MessageEmbed } = require("discord.js")
    const rolePermissions = role.permissions.toArray();
    const finalPermissions = [];
    for (const permission in permissions) {
    finalPermissions.push(`${permissions[permission]}`);
      ;
    }
   // const position = `\`${message.guild.roles.cache.size - role.position}\`/\`${message.guild.roles.cache.size}\``;
const mem = role.members.array()
  const m = mem.length ? mem.length : 0;
  let members;
  if(mem.join(" **|** ").length > 1000) members = "Too many members to show.";
 else if(mem.length === 0) members = "None";
 else members = mem.join(" **|** ");
  
  const embed = new MessageEmbed()
      .setThumbnail(message.guild.iconURL({ dynamic: true }))

.setDescription([
`**❯ Role:** ${role}`, 
`**❯ ID:** ${role.id}`, 
`**❯ Position:** ${role.position}`, 
`**❯ Colour:** ${role.hexColor.toUpperCase()}`, 
`**❯ Mentionable:** ${role.mentionable ? 'Yes' : 'No'}`, 
`**❯ Hoisted:** ${role.hoisted ? 'Yes' : 'No'}`, 
`**❯ Managed:** ${role.managed ? 'Yes' : 'No'}`, 
`**❯ Creation Time:** ${moment(role.createdTimestamp).format(
					'LT'
				)} ${moment(role.createdTimestamp).format('LL')} ${moment(
					role.createdTimestamp
				).fromNow()}`, 
`**❯ Permissions [${finalPermissions.length}]:** \n${finalPermissions.join(', ')}`, 
`**❯ Members [${m}]:**\n${members}`, 
])


 .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()
      .setColor(role.hexColor);
    message.channel.send(`Information about **${role.name}** role`, embed);
  

 }
}

   
