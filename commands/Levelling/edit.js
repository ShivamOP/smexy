const fs = require('fs')
const Discord = require('discord.js')

module.exports = {
    name: 'edit-level-role',
    description: 'Edit a Level Role that is given when a user levels up.', 
 userPerms: ["MANAGE_ROLES"],
    async run(bot, message, args) {
      

        const provideID = 'You need to provide a role ID or mention.';
        const provide = 'You need to provide a number.';

        const Role_To_Edit = args[0]
        if(!Role_To_Edit) return message.channel.send(provideID)

        const New_Number = args[1]
        if(!New_Number) return message.channel.send(provide)
        if(isNaN(New_Number)) return message.channel.send(provide)

        if(New_Number.includes('+')) return message.channel.send(provide)
        if(New_Number.includes('-')) return message.channel.send(provide)
        if(New_Number.includes('.')) return message.channel.send(provide)

        const Level_Roles_Storage = fs.readFileSync('./roles.json')
        const Level_Roles = JSON.parse(Level_Roles_Storage.toString())
        
        const Level_Role_ID_Check = Level_Roles.find(id => {
            return (id.guildID === `${message.guild.id}` && id.Level_Role_ID === Role_To_Edit)
        })
        if(!Level_Role_ID_Check) {
            const No_Roles = 'There is no Level Role with that role.';
            return message.channel.send(No_Roles)
        } else {
            const New_Level_Number = Level_Role_ID_Check.Level_To_Reach = parseInt(New_Number)
            
            const Updating_Data = JSON.stringify(New_Level_Number, null, 4)
            fs.writeFileSync('./roles.json', Updating_Data)
    
            const Updated_Data = JSON.stringify(Level_Roles, null, 4)
            fs.writeFileSync('./roles.json', Updated_Data)

            const Success = 'Level Role has been successfully edited.';
            return message.channel.send(Success)
        }
    }
}

//Level Roles (this