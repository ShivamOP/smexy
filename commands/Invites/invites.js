const Discord = require('discord.js');

module.exports = {
        name: "invites",
        aliases: ['invitations'],
        description: "Shows Users Joined Through Someone's Invites",
        usage: "[name | nickname | mention | ID] (optional)",
         async run(bot, message, args) {
        try {
            let member = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;

            let invites = await message.guild.fetchInvites()

            let memberInvites = invites.filter(i => i.inviter && i.inviter.id === member.user.id);

            if (memberInvites.size <= 0) {
                return message.channel.send(`**${member.displayName} didn't invite anyone to the server!**`, (member === message.member ? null : member));
  {}          }

            let content = memberInvites.map(i => i.code).join("\n");
            let index = 0;
            memberInvites.forEach(invite => index += invite.uses);

            let embed = new Discord.MessageEmbed()
            .setTitle("Invites")  .setThumbnail(member.user.displayAvatarURL({dynami:true}))        .setColor("BLUE") 
    .setDescription([
   `**${member.user.tag}** has \`${index}\` invites.\n`,
 ])
 .addField(`Invitation Codes`,`${content}`)
 
 

 
 
 
            message.channel.send(embed);
        } catch (e) {
            return message.channel.send(e.message)
        }
    }
};