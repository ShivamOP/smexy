
const { MessageEmbed } = require('discord.js');

module.exports = {
    
        name: "members",
        aliases: ['rolemembers', 'rmi', 'roleinfomembers'],
        category: "info",
        description: "Shows List Of Members Having A Role",
        usage: "[role name | role mention | ID]",
        accessableby: "everyone",
    async run(bot, message, args) {
        if (args.includes("@everyone")) return;
        
        if (args.includes("@here")) return;

        if (!args[0]) return message.channel.send("Please enter a valid role mention/id/name.")

        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase());

        if (!role) return message.channel.send("Please enter a valid role mention/id/name.");

        let membersWithRole = message.guild.members.cache.filter(member => {
            return member.roles.cache.find(r => r.name === role.name);
        }).map(member => {
            return member.user.tag;
        })
        let roleEmbed = new MessageEmbed()
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
        . 
        setTimestamp()
            .setColor("role.hexColor")
            .setThumbnail(message.guild.iconURL())
            let d = membersWithRole.join("\n");
if(d.length === 0) d = "There are no members in this role!";
if(d.length) d = "The list is too long to display!";
roleEmbed.setDescription(d);
        message.channel.send(`Members With The __${role.name}__ Role [${membersWithRole.length}]`, roleEmbed);
    }
}