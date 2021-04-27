   const schema = require('../../models/command')

module.exports = {
    name : 'disable',
    aliases: ["cmd-disable"], 
    run: async(bot, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You need administrator permissions to use this command')
 
        const cmd = args[0];
        if(!cmd) return message.channel.send('Please specify a command to disable.')
   const command = bot.commands.get(cmd) || bot.commands.find(cmd => cmd.aliases && Array.isArray(cmd.aliases) && cmd.aliases.includes(cmd));
        if(!command) {
     message.channel.send('This command does not exist.');
  return;
  }
        schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
                if(data.Cmds.includes(cmd)) return message.channel.send('This command has already been disabled.');
                data.Cmds.push(cmd)
            } else {
                data = new schema({
                    Guild: message.guild.id,
                    Cmds: cmd
                })
            }
            await data.save();
            message.channel.send(`Disabled **${cmd}** command!`)
        })
    
    }
}



        