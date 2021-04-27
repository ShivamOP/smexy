const Discord = require('discord.js');
const bot = new Discord.Client();
const db = require('quick.db');
module.exports = {
    name: "autorole-add",
    aliases: ["autoroleadd"],
    desc: "Adds an autorole",
usage: "<role ID/mention/name>",
userPerms: ["MANAGE_ROLES"],
botPerms: [],
        async run(bot, message, args) {
          if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send("You don't have enough permissions to use this commmand");
          if(!db.has(`${message.guild.id}-autoroles`)) {
db.set(`${message.guild.id}-autoroles`, ["IGNORE THIS"])
}
const rolexd = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(" ").toLowerCase());
if(!rolexd) return message.channel.send(`Please provide a valid role mention/id/name.`);
      const check = db.get(`${message.guild.id}-autoroles`);
      if (check.includes(rolexd.id))
        return message.channel.send(
          `\`${rolexd.name}\` is already listed as a auto-role.`
        );
     const a = message.member.roles.highest.position;
    const b = rolexd.position;
      const c = message.guild.me.roles.highest.position;
      if(a <= b && message.guild.ownerID !== message.author.id) return message.channel.send(`The role \'${rolexd.name}\' (position ${rolexd.position}) is above or equal to your highest role \'${message.member.roles.highest.name}\' (position ${message.member.roles.highest.position}) and cannot be handed out by you. Please ensure that your highest role is above the role you want to be assigned.`);
      if(c <= b) return message.channel.send(`The role \'${rolexd.name}\' (position ${rolexd.position}) is above or equal to my highest role \'${message.guild.me.roles.highest.name}\' (position ${message.guild.me.roles.highest.position}) and cannot be handed by me. Please ensure that my highest role is above the role you want to be assigned.`);
        if(rolexd.managed) return message.channel.send(`That role is managed. (that is a role of a bot) which cannot be assigned to normal members.`);
        
        const result = rolexd.id;
db.push(`${message.guild.id}-autoroles`,`${result}`)
const embed = new Discord.MessageEmbed()
.setColor(rolexd.hexColor) 
.setTitle(`Autorole Added`) 
.setDescription(`${rolexd} will now be automatically assigned upon joining.`)
message.channel.send(embed);

}
}