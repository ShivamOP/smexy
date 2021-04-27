const fs = require('fs')
const Discord = require('discord.js')

module.exports = {
    name: 'add-level-role',
    description: 'Add a Role that is given when a user reached a specific level.', 
    userPerms: ["MANAGE_ROLES"],
    async run(bot, message, args) {
      

        const provide = 'You need to provide a role ID or mention.';
        const provideLevel = 'You need to provide a number.';

        const Role_To_Add = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
        if(!Role_To_Add) return message.channel.send(provide)

        const Level_To_Reach = args[1]
        if(!Level_To_Reach) return message.channel.send(provideLevel)
        if(isNaN(Level_To_Reach)) return message.channel.send(provideLevel)

        if(Level_To_Reach.includes('+')) return message.channel.send(provideLevel)
        if(Level_To_Reach.includes('-')) return message.channel.send(provideLevel)
        if(Level_To_Reach.includes('.')) return message.channel.send(provideLevel)

        const Level_Roles_Storage = fs.readFileSync('./roles.json')
        const Level_Roles = JSON.parse(Level_Roles_Storage.toString())
        
        const Level_To_Reach_Check = Level_Roles.find(reach => {
            return (reach.guildID === `${message.guild.id}` && reach.Level_To_Reach === parseInt(Level_To_Reach))
        })
        if(!Level_To_Reach_Check) {
            Level_Roles.push(
                {   
                    guildID: `${message.guild.id}`,
                    Level_Role: `${Role_To_Add.name}`,
                    Level_Role_ID: `${Role_To_Add.id}`,
                    Level_To_Reach: parseInt(Level_To_Reach)
                }
            )
            
            const New_Level_Role = JSON.stringify(Level_Roles, null, 4)
            fs.writeFileSync('./roles.json', New_Level_Role)

            const Success = 'New Level Role has been successfully added.';
            
            return message.channel.send(Success)
        } else {
            const Already = "There is already a role that has that same level to reach.";
            return message.channel.send(Already)
        }
    }
}


