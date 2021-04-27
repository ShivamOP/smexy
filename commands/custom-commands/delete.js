const schema = require('../../models/cc');



module.exports = {
    name: 'cc-delete',
          usage: "<cc_name>",
desc: "To delete a custom command",
userPerms: ["ADMINISTRATOR"],
botPerms: [],
    aliases: ['cc-remove', 'ccremove', 'ccdelete'],
    async run(bot, message, args) {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You do not have enough permissions to use this command.');

        const name = args[0].toLowerCase();
        if(!name) return message.channel.send('Please specify a command name.');

        const data = await schema.findOne({ Guild: message.guild.id, Command: name });
        if(!data) return message.channel.send('That custom command does not exist!');
        await schema.findOneAndDelete({ Guild: message.guild.id, Command: name });
        message.channel.send(`Removed **${name}** from custom commands!`);
    }
}