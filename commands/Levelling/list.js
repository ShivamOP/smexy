const fs = require('fs')
const Discord = require('discord.js');
const { runInContext } = require('vm');

module.exports = {
    name: 'level-roles',
    description: 'Shows the list of Level Roles of the server.', 
     userPerms: ["MANAGE_ROLES"],
    async run(bot, message, args) {
        const Level_Roles_Storage = fs.readFileSync('./roles.json')
        const Level_Roles = JSON.parse(Level_Roles_Storage.toString())
        
        const Guild_Check = Level_Roles.find(reach => {
            return reach.guildID === `${message.guild.id}`
        })
        if(!Guild_Check) {
            const No_Roles = 'There are no Level Roles set on this server.';
        
            return message.channel.send(No_Roles)
        }

      
        const list = Level_Roles.filter(Level_Roles => {
            return Level_Roles.guildID === message.guild.id
        }).sort((a, b) => a.Level_To_Reach - b.Level_To_Reach).map((Roles,index) => {
     return `**${index + 1}**. ${(message.guild.roles.cache.get(Roles.Level_Role_ID) || "Unknown Role")} - ${Roles.Level_To_Reach} level`;
   
        })
    


        const Success = new Discord.MessageEmbed()
       .setThumbnail(message.guild.iconURL({dynamic:true}))
        .setTitle('Level Roles list of '+message.guild.name)
        .setDescription(list.join("\n\n"))
        .setFooter(`Total Level Roles: ${list.length}`)
        .setTimestamp()
       
        .setColor("#c98aff")
        .setTimestamp()
        return message.channel.send(Success)
    }
}