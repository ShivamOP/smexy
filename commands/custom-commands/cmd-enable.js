const schema = require('../../models/command')

module.exports = {
    name : 'enable',
    aliases: ["cmd-enable"], 
    run: async(bot, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You need administrator permissions to use this command')
 
        const cmd = args[0];
        if(!cmd) return message.channel.send('Please specify a command to enable.')
   const command = bot.commands.get(cmd) || bot.commands.find(cmd => cmd.aliases && Array.isArray(cmd.aliases) && cmd.aliases.includes(cmd));
        if(!command) {
     message.channel.send('This command does not exist.');
  return;
  }
        schema.findOne({ Guild: message.guild.id }, async(err, data) => {
          if(err) throw err;
          if(data) {
              if(data.Cmds.includes(cmd)) {
                  let commandNumber;

                  for (let i = 0; i < data.Cmds.length; i++) {
                      if(data.Cmds[i] === cmd) data.Cmds.splice(i, 1)
                  }

                  await data.save()
                  message.channel.send(`Enabled **${cmd}** command!`)
              }  else return message.channel.send('That command isnt turned off.')
          }
        })
    }
}