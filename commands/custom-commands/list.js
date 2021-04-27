const schema = require('../../models/cc');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "cc-list",
    aliases: ['cclist'],
desc: "To list all custom commands",
userPerms: ["ADMINISTRATOR"],
botPerms: [],
    async run(bot, message, args) {
        const data  = await schema.find({ Guild: message.guild.id });
        if(!data || data === null || data === false || data === undefined || !!data === false) return message.channel.send('There is no custom commands!');
        message.channel.send(
            new MessageEmbed()
            .setTitle(`Custom Commands List of ${message.guild.name}`)
            .setThumbnail(message.guild.iconURL({dynamic:true}))
                .setColor('BLUE')
                .setDescription(
                    data.map((cmd, i) => 
                        `**${i + 1}**. ${cmd.Command}`
                    ).join('\n')
                )
        )
    }
}