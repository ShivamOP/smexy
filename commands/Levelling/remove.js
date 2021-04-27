const fs = require('fs')
const Discord = require('discord.js')

module.exports = {
    name: 'remove-level-role',
    description: 'Remove a Level Role that is given when a user levels up.',  
     userPerms: ["MANAGE_ROLES"],
   
    async run(bot, message, args) {
     

        const provide = 'You need to provide a role ID or mention.';
      

        const Role_To_Remove = message.mentions.roles.first() || message.uild.roles.cache.get(args[0]);

        if(!Role_To_Remove) return message.channel.send(provide)

        const Level_Roles_Storage = fs.readFileSync('./roles.json')
        const Level_Roles = JSON.parse(Level_Roles_Storage.toString())
        
        const Level_Role_ID_Check = Level_Roles.find(id => {
            return (id.guildID === `${message.guild.id}` && id.Level_Role_ID === Role_To_Remove.id)
        })
        if(!Level_Role_ID_Check) {
            const No_Roles = 'There is no Level Role with that role.';
            return message.channel.send(No_Roles)
        } else {
            const Removing_Level_Role = Level_Roles.filter(id => {
                return id.Level_Role_ID !== `${Role_To_Remove.id}`
            });
            fs.writeFileSync('./roles.json', JSON.stringify(Removing_Level_Role, null, 4));
            
            const Success = 'The Level Role has been successfully removed.';
            
            message.channel.send(Success)
            //Saves the Data, this also means that it won't bring back the previous data after it got deleted
            return setTimeout(() => {
                const Saving_Data = fs.readFileSync('./roles.json', 'utf8')
                const Saved_Data = JSON.parse(Saving_Data.toString())
                fs.writeFileSync('./roles.json', JSON.stringify(Saved_Data, null, 4))
            }, 1000)
        }
    }
}
