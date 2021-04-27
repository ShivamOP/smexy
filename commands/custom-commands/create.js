const schema = require('../../models/cc');



module.exports = {
    name: 'cc-create',
      usage: "<cc_name> <cc_response>",
desc: "To add a custom command",
userPerms: ["ADMINISTRATOR"],
botPerms: [],
    aliases: ['cc-add', 'ccadd', 'cccreate'],
    async run(bot, message, args) {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You do not have enough permissions to use this command.');

        const name = args[0].toLowerCase();
      const response = args.slice(1).join(" ");

        if(!name) return message.channel.send('Please specify a command name.');
        if(!response) return message.channel.send('Please specify a response.');
const cmnd = await bot.commands.get(name) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(name));
  if(cmnd) return message.channel.send(`A command with name **${name}** already exists in my default commands. So, please use a different command name.`);

        const data = await schema.findOne({ Guild: message.guild.id, Command: name });
        if(data) return message.channel.send('This custom commands exists already.');
        const newData =  new schema({
            Guild: message.guild.id,
            Command: name,
            Response: response
        })
        await newData.save();
        message.channel.send(`Saved **${name}** as a custom command with response: **${response}**`);
    }
}
